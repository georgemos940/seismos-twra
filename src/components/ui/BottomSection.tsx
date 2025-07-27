"use client";

import React from "react";
import { cn } from "@/lib/cn";
import useInView from "@/hooks/useInView";
import Link from "next/link";
import Image from "next/image";
import Tilt from "react-parallax-tilt";

const BottomSection: React.FC = () => {
  const { ref, isIntersecting } = useInView(0.2);

  return (
    <section
      ref={ref}
      className="w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white px-6 py-32 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center relative z-10 space-y-10">
         {/* 🔹 Κείμενο */}
        <h2
          className={cn(
            "text-3xl sm:text-4xl font-bold mb-4 transition-all duration-700",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          Μείνετε ενημερωμένοι για τη σεισμική δραστηριότητα
        </h2>
          <p
          className={cn(
            "text-gray-300 max-w-2xl mx-auto mb-6 leading-relaxed transition-all duration-700",
            isIntersecting ? "opacity-100 translate-y-0 delay-200" : "opacity-0 translate-y-4"
          )}
        >
          Για πιο ολοκληρωμένα και αξιόπιστα αποτελέσματα σχετικά με τον σεισμό, 
          παρακαλώ επισκεφθείτε την ειδική ενότητα του Πανεπιστημίου Αθηνών, Τμήματος Γεωλογίας.
        </p>
        {/* 🔹 Responsive Tilted GIF */}
        <Tilt className="mx-auto w-full sm:w-[400px] md:w-[550px] lg:w-[650px] transition-transform duration-700">
          <div
            className={cn(
              "w-full h-auto relative rounded-xl shadow-2xl transition-all duration-1000 ease-out",
              isIntersecting ? "opacity-100 scale-100" : "opacity-0 scale-95"
            )}
            style={{ aspectRatio: "16 / 9" }} // προαιρετικά για αναλογία
          >
            <Image
              src="/gifs/seismic-activity.gif"
              alt="Σεισμικό GIF"
              fill
              className="object-cover rounded-xl"
              priority
            />
          </div>
        </Tilt>

      

      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
        {/* Κουμπί 1: UOA */}
        <Link
          href="http://www.geophysics.geol.uoa.gr/stations/maps/recent_eq_1d_el.htm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-full text-lg font-semibold shadow-lg
            bg-gradient-to-r from-yellow-400 to-yellow-500
            text-gray-900 transition-all duration-300 ease-in-out
            hover:from-yellow-500 hover:to-yellow-600 hover:-translate-y-1 hover:scale-105"
        >
          Παν. Αθηνών (UOA) →
        </Link>

        {/* Κουμπί 2: ΕΑΑ */}
        <Link
          href="https://www.gein.noa.gr"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 rounded-full text-lg font-semibold shadow-lg
            bg-gradient-to-r from-blue-500 to-blue-600
            text-white transition-all duration-300 ease-in-out
            hover:from-blue-600 hover:to-blue-700 hover:-translate-y-1 hover:scale-105"
        >
          Εθνικό Αστεροσκοπείο Αθηνών (ΕΑΑ) →
        </Link>
      </div>
      </div>
    </section>
  );
};

export default BottomSection;
