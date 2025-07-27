import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// === In-memory rate limiter === //
// -- in production please use redis........ this is only for a vps --//
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW_MS = 2 * 60 * 60 * 1000; // 2 hours
const RATE_LIMIT_MAX = 2; // 2 message/2h

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.timestamp > RATE_LIMIT_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return false;
  }

  entry.count++;
  if (entry.count > RATE_LIMIT_MAX) return true;

  return false;
}

// === Main Handler ===
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  const { name, email, message, token } = await req.json();

  // === Basic Validation ===
  if (!name || !email || !message || !token) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const nameTrimmed = name.trim();
  const emailTrimmed = email.trim();
  const messageTrimmed = message.trim();

  if (nameTrimmed.length < 2 || nameTrimmed.length > 100) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  if (messageTrimmed.length < 10 || messageTrimmed.length > 2000) {
    return NextResponse.json({ error: "Invalid message length" }, { status: 400 });
  }

  // === Verify reCAPTCHA ===
  const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${token}`,
  });
  const recaptchaData = await recaptchaRes.json();

  if (!recaptchaData.success || recaptchaData.score < 0.5) {
    return NextResponse.json({ error: "reCAPTCHA failed" }, { status: 403 });
  }

  // === Send Email ===
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
  });

  try {
    // === 1. Email προς εσένα ===
    await transporter.sendMail({
      from: `"Seismos-twra.gr" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.ADMIN_EMAIL!,
      replyTo: emailTrimmed,
      subject: `Νέο μήνυμα από ${nameTrimmed}`,
      text: `Όνομα: ${nameTrimmed}\nEmail: ${emailTrimmed}\n\n${messageTrimmed}`,
    });

    // === 2. Auto-reply στον χρήστη (προαιρετικό) ===
    await transporter.sendMail({
      from: `"Seismos-twra.gr" <${process.env.ADMIN_EMAIL}>`,
      to: emailTrimmed,
      subject: "Ευχαριστούμε για την επικοινωνία σας",
      text: `Αγαπητέ/ή ${nameTrimmed},\n\nΛάβαμε το μήνυμά σας και θα σας απαντήσουμε σύντομα.\n\nΜε εκτίμηση,\nSeismos-twra.gr`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error sending email:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
