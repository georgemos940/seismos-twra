"use client";

import React, { useState } from "react";
import { toast } from "sonner";
import { GoogleReCaptchaProvider, useGoogleReCaptcha } from "react-google-recaptcha-v3";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

const InnerModal: React.FC<Props> = ({ onClose, onSuccess }) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [strength, setStrength] = useState<"Μικρός" | "Μεσαίος" | "Μεγάλος" | "">("");
  const [loading, setLoading] = useState(false);
  const options = ["Μικρός", "Μεσαίος", "Μεγάλος"] as const;

  const handleSubmit = async () => {
    if (!executeRecaptcha) {
      toast.error("Το reCAPTCHA δεν είναι έτοιμο.");
      return;
    }

    if (!strength) {
      toast.error("Παρακαλώ επιλέξτε την ένταση του σεισμού.");
      return;
    }

    setLoading(true);

    try {
      const captchaToken = await executeRecaptcha("report_earthquake");

      const res = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: strength, recaptchaToken: captchaToken }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Η αναφορά σας υποβλήθηκε επιτυχώς!");
        onSuccess();
      } else {
        toast.error(data.error || "Σφάλμα υποβολής.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 border border-white/30 p-6 rounded-2xl shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-extrabold mb-4 text-center bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Αναφορά Σεισμού
        </h2>

        <p className="text-gray-300 text-center mb-4">
          Πόσο έντονος ήταν ο σεισμός που νιώσατε;
        </p>

        <div className="flex justify-center gap-4 mb-4">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => setStrength(option)}
              className={`px-4 py-2 rounded-full font-semibold transition border-2 ${
                strength === option
                  ? "border-white bg-white text-gray-900"
                  : "border-gray-600 bg-gray-800 text-white hover:border-white"
              }`}
              disabled={loading}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-gray-700 px-4 py-2 rounded-full text-white hover:bg-gray-600 transition"
            disabled={loading}
          >
            Ακύρωση
          </button>
          <button
            onClick={handleSubmit}
            className="bg-white px-4 py-2 rounded-full text-gray-900 hover:bg-gray-300 font-semibold transition shadow-md"
            disabled={loading}
          >
            Υποβολή
          </button>
        </div>
      </div>
    </div>
  );
};

const ReportModal: React.FC<Props> = (props) => {
  return (
    <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}>
      <InnerModal {...props} />
    </GoogleReCaptchaProvider>
  );
};

export default ReportModal;
