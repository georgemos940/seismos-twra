import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

const REPORTS_FILE = path.resolve("./src/data/reports.json");

interface Report {
  ip: string;
  time: string;
  description: string;
}

// === GET ===
export async function GET() {
  try {
    const data = await fs.readFile(REPORTS_FILE, "utf-8");
    const allReports: Report[] = JSON.parse(data);

    const today = new Date().toISOString().split("T")[0];
    const filteredReports = allReports.filter((r) =>
      r.time.startsWith(today)
    );

    return NextResponse.json({ reports: filteredReports });
  } catch (error) {
    console.error("Σφάλμα κατά την ανάγνωση των αναφορών:", error);
    return NextResponse.json(
      { error: "Αποτυχία λήψης των αναφορών." },
      { status: 500 }
    );
  }
}

// === POST ===
export async function POST(req: NextRequest) {
  try {
    const { description, recaptchaToken } = await req.json();

    if (!description || !recaptchaToken) {
      return NextResponse.json(
        { error: "Λείπουν απαιτούμενα πεδία." },
        { status: 400 }
      );
    }

    // === reCAPTCHA Verification ===
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    const verifyRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      }
    );
    const recaptchaData = await verifyRes.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: "Η επαλήθευση του reCAPTCHA απέτυχε." },
        { status: 403 }
      );
    }

    // === Get IP ===
    const forwarded = req.headers.get("x-forwarded-for");
    const ip = forwarded ? forwarded.split(",")[0].trim() : "unknown";
    const now = new Date();

    // === Read existing reports ===
    let existingReports: Report[] = [];
    try {
      const fileData = await fs.readFile(REPORTS_FILE, "utf-8");
      existingReports = JSON.parse(fileData);
    } catch {
      existingReports = [];
    }

    // === Check IP lock (15 min) ===
    const alreadyReported = existingReports.find(
      (r) =>
        r.ip === ip &&
        now.getTime() - new Date(r.time).getTime() < 15 * 60 * 1000
    );
    if (alreadyReported) {
      return NextResponse.json(
        {
          error:
            "Έχετε ήδη υποβάλει αναφορά πρόσφατα. Παρακαλώ περιμένετε λίγα λεπτά πριν ξαναδοκιμάσετε.",
        },
        { status: 429 }
      );
    }

    // === Save new report ===
    const newReport: Report = {
      ip,
      time: now.toISOString(),
      description,
    };

    existingReports.push(newReport);
    await fs.writeFile(REPORTS_FILE, JSON.stringify(existingReports, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Σφάλμα στην POST /api/report:", error);
    return NextResponse.json(
      { error: "Σφάλμα διακομιστή. Προσπαθήστε ξανά αργότερα." },
      { status: 500 }
    );
  }
}
