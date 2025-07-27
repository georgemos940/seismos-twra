"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

const HeaderTransitionSection: React.FC = () => {
  return (
    <section
      className={cn(
        "text-white px-6 py-10 text-center relative overflow-hidden"
      )}
    >

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Τίτλος */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white animate-fade-in">
          Live View Χάρτης
        </h2>
        {/* Περιγραφή */}
        <p className="text-gray-400 mb-6 max-w-xl text-sm sm:text-base">
          Ανακαλύψτε τους σεισμούς που συμβαίνουν τώρα, ζωντανά και σε πραγματικό χρόνο!
        </p>
        {/* Δείκτης προς τα κάτω */}
        <ChevronDown className="w-8 h-8 text-gray-400 animate-bounce" />
      </div>
    </section>
  );
};

export default HeaderTransitionSection;
