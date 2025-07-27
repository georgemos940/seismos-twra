"use client";

import React from "react";
import InstituteCard from "@/components/shared/InstituteCard";
import useInView from "@/hooks/useInView";
import { cn } from "@/lib/cn";

const institutes = [
  {
    name: "Γεωδυναμικό Ινστιτούτο Εθνικού Αστεροσκοπείου Αθηνών",
    description:
      "Το κορυφαίο σεισμολογικό ινστιτούτο της Ελλάδας, με συνεχή καταγραφή σεισμών και ενημέρωση σε πραγματικό χρόνο.",
    image: "/img/institutes/gein.jpg",
    link: "https://www.gein.noa.gr",
  },
  {
    name: "Τμήμα Γεωλογίας και Γεωπεριβάλλοντος, ΕΚΠΑ",
    description:
      "Πρωτοποριακή έρευνα και εκπαίδευση στον τομέα της σεισμολογίας και των γεωεπιστημών στην Ελλάδα.",
    image: "/img/institutes/uoa.jpg",
    link: "http://www.geophysics.geol.uoa.gr",
  },
  {
    name: "Σεισμολογικό Εργαστήριο ΑΠΘ",
    description:
      "Εξειδικευμένη παρακολούθηση σεισμικής δραστηριότητας και έρευνα στο βόρειο ελλαδικό χώρο.",
    image: "/img/institutes/auth.jpg",
    link: "https://seismo.auth.gr",
  },
  {
    name: "USGS Earthquake Hazards Program",
    description:
      "Παγκόσμια σεισμολογική πλατφόρμα με δεδομένα, χάρτες και αναλύσεις για σεισμούς.",
    image: "/img/institutes/usgs.png",
    link: "https://earthquake.usgs.gov/earthquakes/map/?extent=21.16648,-127.5293&extent=52.34876,-62.44629",
  },
  {
    name: "EMSC - Ευρωπαϊκό Μεσογειακό Σεισμολογικό Κέντρο",
    description:
      "Αξιόπιστη πηγή δεδομένων για σεισμούς στην Ευρώπη και τη Μεσόγειο.",
    image: "/img/institutes/emsc.webp",
    link: "https://www.emsc-csem.org",
  },
  {
    name: "International Seismological Centre (ISC)",
    description:
      "Συλλογή και ανάλυση παγκόσμιων σεισμολογικών δεδομένων, παρέχοντας το ISC Bulletin.",
    image: "/img/institutes/isc.png",
    link: "https://www.isc.ac.uk/",
  },
  {
    name: "Global Seismographic Network (GSN)",
    description:
      "Παγκόσμιο δίκτυο σεισμογραφικών σταθμών για την παρακολούθηση της σεισμικής δραστηριότητας.",
    image: "/img/institutes/gsn.jpg",
    link: "https://ds.iris.edu/gmap/#network=_GSN&planet=earth",
  },
  {
    name: "Earthquake Research Institute, University of Tokyo",
    description:
      "Έρευνα και εκπαίδευση στη σεισμολογία και τη γεωφυσική στην Ιαπωνία.",
    image: "/img/institutes/eri.jpg",
    link: "https://www.u-tokyo.ac.jp/ja/index.html",
  },
  {
    name: "Centro Sismológico Nacional, Universidad de Chile",
    description:
      "Παρακολούθηση και ανάλυση σεισμικής δραστηριότητας στη Χιλή και τη Νότια Αμερική.",
    image: "/img/institutes/csn.jpg",
    link: "https://www.sismologia.cl/sismicidad/catalogo/2025/06/20250602.html",
  },
  {
    name: "http://seismo.ethz.ch/en/earthquakes/europe/last90daysMag4.5plus/",
    description:
      "Ομοσπονδιακή υπηρεσία για την παρακολούθηση σεισμών στην Ελβετία και την αξιολόγηση σεισμικού κινδύνου.",
    image: "/img/institutes/sed.png",
    link: "https://www.seismo.ethz.ch/",
  },
  {
    name: "International Institute of Seismology and Earthquake Engineering (IISEE)",
    description:
      "Έρευνα και εκπαίδευση για τη μείωση των σεισμικών κινδύνων παγκοσμίως.",
    image: "/img/institutes/iisee.jpg",
    link: "https://iisee.kenken.go.jp",
  },
  {
    name: "Global Earthquake Model Foundation (GEM)",
    description:
      "Ανάπτυξη παγκόσμιων προτύπων για την εκτίμηση σεισμικού κινδύνου και την ενίσχυση της ανθεκτικότητας.",
    image: "/img/institutes/gem.jpg",
    link: "https://www.globalquakemodel.org/",
  },
];

const AboutContent: React.FC = () => {
  const { ref, isIntersecting } = useInView(0.2);

  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1
          ref={ref}
          className={cn(
            "text-6xl font-bold text-center mt-18 mb-16",
            "bg-gradient-to-r text-white bg-clip-text ",
            "transition-all duration-1000",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          )}
        >
          Σχετικά - Πηγές
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {institutes.map((institute, index) => (
            <InstituteCard
              key={index}
              name={institute.name}
              description={institute.description}
              image={institute.image}
              link={institute.link}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

export default AboutContent;
