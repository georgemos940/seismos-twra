"use client";

import useInView from "@/hooks/useInView";

export default function PrivacyPolicyPage() {
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
          Πολιτική Απορρήτου
        </h1>

        <div className="space-y-8 text-base leading-relaxed text-gray-300">
          <p>
            Η προστασία των προσωπικών σας δεδομένων είναι σημαντική για εμάς. Η παρούσα πολιτική εξηγεί πώς συλλέγουμε, χρησιμοποιούμε και προστατεύουμε τις πληροφορίες σας.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">1. Δεδομένα που Συλλέγουμε</h2>
            <p>
              Δεν συλλέγουμε προσωπικά δεδομένα άμεσα, εκτός αν μας τα παρέχετε μέσω email. Το site ενδέχεται να χρησιμοποιεί cookies και τρίτες υπηρεσίες όπως το Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">2. Χρήση Πληροφοριών</h2>
            <p>
              Τα δεδομένα που συλλέγονται χρησιμοποιούνται αποκλειστικά για λόγους στατιστικής ανάλυσης και βελτιστοποίησης της εμπειρίας χρήστη.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">3. Χρήση Cookies</h2>
            <p>
              Το seismos-twra.gr ενδέχεται να χρησιμοποιεί cookies για την παρακολούθηση της επισκεψιμότητας και την ανάλυση δεδομένων μέσω υπηρεσιών όπως το Google Analytics.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">4. Υπηρεσίες Τρίτων</h2>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Google Analytics (στατιστική ανάλυση)</li>
              <li>Vercel (φιλοξενία της ιστοσελίδας)</li>
              <li>GitHub Actions (διαδικασία deployment)</li>
              <li>Passinbox (email επικοινωνίας)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">5. Δικαιώματα Χρηστών</h2>
            <p>
              Έχετε το δικαίωμα να ζητήσετε πρόσβαση, διόρθωση ή διαγραφή των προσωπικών σας δεδομένων ανά πάσα στιγμή.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">6. Επικοινωνία</h2>
            <p>
              Για οποιοδήποτε αίτημα ή ερώτηση, μπορείτε να επικοινωνήσετε στο{" "}
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
