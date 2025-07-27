"use client";

import React, { useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { cn } from "@/lib/cn";
import useInView from "@/hooks/useInView";
import { X } from "lucide-react";

const ContactPage = () => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { ref, isIntersecting } = useInView(0.2);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    if (!executeRecaptcha) {
      console.warn("reCAPTCHA is not ready yet.");
      setStatus("error");
      setLoading(false);
      return;
    }

    try {
      const token = await executeRecaptcha("contact_form");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, token }),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-24 px-6">
      <div className="max-w-3xl mx-auto">
        <h1
          ref={ref}
          className={cn(
            "text-6xl font-bold text-center mt-18 mb-16",
            "bg-clip-text text-white",
            "transition-all duration-1000",
            isIntersecting
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          )}
        >
          Επικοινωνία
        </h1>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 bg-opacity-80 rounded-lg shadow-md p-8 space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-semibold mb-2">
              Όνομα
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition"
              placeholder="Το όνομά σας"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-semibold mb-2">
              Μήνυμα
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 rounded bg-gray-800 text-gray-100 placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-600 transition resize-none"
              placeholder="Γράψτε το μήνυμά σας..."
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 disabled:opacity-50"
          >
            {loading ? "Αποστολή..." : "Αποστολή"}
          </button>

          {status === "success" && (
            <div className="relative mt-4 p-4 rounded-lg bg-green-600/10 border border-green-600 text-green-400">
              <button
                onClick={() => setStatus("idle")}
                type="button"
                className="absolute top-2 right-2 text-green-400 hover:text-white"
              >
                <X size={16} />
              </button>
              <p className="text-sm font-medium">Το μήνυμά σας εστάλη επιτυχώς.</p>
            </div>
          )}

          {status === "error" && (
            <div className="relative mt-4 p-4 rounded-lg bg-red-600/10 border border-red-600 text-red-400">
              <button
                onClick={() => setStatus("idle")}
                type="button"
                className="absolute top-2 right-2 text-red-400 hover:text-white"
              >
                <X size={16} />
              </button>
              <p className="text-sm font-medium">Σφάλμα κατά την αποστολή. Προσπαθήστε ξανά αργότερα.</p>
            </div>
          )}
        </form>
      </div>
    </main>
  );
};

export default ContactPage;
