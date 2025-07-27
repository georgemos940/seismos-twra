// app/terms/page.tsx
"use client";

import useInView from "@/hooks/useInView";

export default function TermsPage() {
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
          Όροι Χρήσης
        </h1>

        <div className="space-y-8 text-base leading-relaxed text-gray-300">
          <p>
            Παρακαλούμε διαβάστε προσεκτικά τους παρακάτω όρους πριν χρησιμοποιήσετε την ιστοσελίδα seismos-twra.gr.
            Η χρήση της ιστοσελίδας συνεπάγεται αποδοχή των παρακάτω όρων.
          </p>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">1. Περιεχόμενο</h2>
            <p>
              Όλες οι πληροφορίες που παρέχονται στην ιστοσελίδα προέρχονται από δημόσιες ή επιστημονικές πηγές και προορίζονται αποκλειστικά για ενημερωτικούς σκοπούς.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">2. Περιορισμός Ευθύνης</h2>
            <p>
              Παρόλο που καταβάλλεται προσπάθεια για την ακρίβεια των πληροφοριών, το seismos-twra.gr δεν φέρει καμία ευθύνη για λάθη, καθυστερήσεις ή ανακρίβειες στα δεδομένα.
              Η χρήση των πληροφοριών γίνεται με αποκλειστική ευθύνη του χρήστη.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">3. Πνευματικά Δικαιώματα</h2>
            <p>
              Το περιεχόμενο της ιστοσελίδας, εκτός των δεδομένων από τρίτους, προστατεύεται από πνευματικά δικαιώματα και δεν επιτρέπεται η αντιγραφή ή αναπαραγωγή χωρίς έγκριση.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">4. Συνδέσεις προς τρίτους</h2>
            <p>
              Η ιστοσελίδα μπορεί να περιέχει συνδέσμους προς τρίτους ιστότοπους. Δεν φέρουμε ευθύνη για το περιεχόμενο ή την πολιτική απορρήτου αυτών των ιστοσελίδων.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">5. Τροποποιήσεις</h2>
            <p>
              Διατηρούμε το δικαίωμα να τροποποιήσουμε τους παρόντες όρους χρήσης οποιαδήποτε στιγμή χωρίς προηγούμενη ειδοποίηση. Συνιστάται να ελέγχετε περιοδικά τη σελίδα.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-white mb-2">6. Επικοινωνία</h2>
            <p>
              Για οποιαδήποτε ερώτηση ή σχόλιο, μπορείτε να επικοινωνήσετε στο{" "}
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
