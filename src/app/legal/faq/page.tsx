"use client";

import useInView from "@/hooks/useInView";

export default function FAQPage() {
  const { ref, isIntersecting } = useInView(0.2);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1
          ref={ref}
          className={`text-4xl sm:text-5xl font-bold text-center mb-12 transition-all duration-1000 ${
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          Συχνές Ερωτήσεις
        </h1>

        <div className="space-y-10 text-base leading-relaxed text-gray-300">
          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              🧭 Από πού προέρχονται τα δεδομένα για τους σεισμούς;
            </h2>
            <p>
              Τα δεδομένα προέρχονται από επίσημες πηγές, όπως το Γεωδυναμικό Ινστιτούτο, το EMSC, το USGS και άλλους φορείς που προσφέρουν δημόσια APIs.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              ⏱️ Πόσο συχνά ενημερώνονται οι πληροφορίες;
            </h2>
            <p>
              Η εφαρμογή ελέγχει για νέους σεισμούς κάθε 1 λεπτό και ενημερώνει τη μνήμη cache με τα πιο πρόσφατα δεδομένα.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              📡 Χρειάζεται να κάνω εγγραφή για να χρησιμοποιήσω την υπηρεσία;
            </h2>
            <p>Όχι. Η ιστοσελίδα είναι ανοιχτή και δεν απαιτείται εγγραφή ή σύνδεση.</p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              🛡️ Τι συμβαίνει με τα προσωπικά μου δεδομένα;
            </h2>
            <p>
              Δεν συλλέγουμε προσωπικά δεδομένα. Η ιστοσελίδα χρησιμοποιεί μόνο στατιστικά εργαλεία (όπως το Google Analytics) για βελτίωση της εμπειρίας. Περισσότερα στην{" "}
              <a href="/privacy" className="text-blue-400 hover:underline">
                Πολιτική Απορρήτου
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              📱 Μπορώ να χρησιμοποιήσω την ιστοσελίδα σε κινητό;
            </h2>
            <p>
              Φυσικά. Η ιστοσελίδα είναι πλήρως responsive και σχεδιασμένη για όλες τις συσκευές.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-white mb-2">
              ✉️ Πώς μπορώ να επικοινωνήσω μαζί σας;
            </h2>
            <p>
              Μπορείτε να μας στείλετε email στο{" "}
              <a
                href="mailto:seismoi-twra.flail698@passinbox.com"
                className="text-blue-400 hover:underline"
              >
                seismoi-twra.flail698@passinbox.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
