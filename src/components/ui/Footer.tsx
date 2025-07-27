"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Copyright } from "lucide-react";
import useInView from "@/hooks/useInView";
import { cn } from "@/lib/cn";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { ref, isIntersecting } = useInView(0.2);

  return (
    <footer className="relative bg-gradient-to-br from-[#0a0a0f] via-[#0f1a2a] to-[#0a0a0f] text-gray-100 pt-20 overflow-hidden">
      <div className="absolute bottom-[-80px] left-[-80px] w-96 h-96 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-800 rounded-full opacity-10 animate-pulse blur-3xl z-0"></div>
      <div className="absolute bottom-[-80px] right-[-80px] w-96 h-96 bg-gradient-to-br from-blue-900 via-blue-800 to-gray-800 rounded-full opacity-10 animate-pulse blur-3xl z-0"></div>

      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm z-0"></div>

      <div
        ref={ref}
        className={cn(
          "container mx-auto px-6 relative z-10 transform transition-all duration-1000",
          isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 gap-y-8 mb-8">
          {/* Logo */}
          <div className="order-1 flex items-center gap-3">
            <Image src="/img/logo/logo.png" alt="logo" width={150} height={150} />
          </div>

          {/* Σχετικά */}
          <div className="order-2">
            <h3 className="text-xl font-bold mb-3">Σχετικά</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Το Live Σεισμοί Ελλάδα παρέχει ενημέρωση για σεισμούς σε πραγματικό χρόνο.
              Μείνετε ασφαλείς με αξιόπιστα δεδομένα και ανάλυση.
            </p>
          </div>

          {/* Επικοινωνία */}
          <div className="order-3">
            <h3 className="text-xl font-bold mb-3">Επικοινωνία</h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              Για οποιαδήποτε απορία ή αναφορά προβλήματος:
            </p>
            <Link
              href="mailto:seismoi-twra.flail698@passinbox.com"
              className="inline-block mt-2 text-sm text-gray-300 hover:text-white hover:underline transition"
            >
              Στείλτε μας email →
            </Link>
          </div>

          {/* Σύνδεσμοι */}
          <div className="order-4">
            <h3 className="text-xl font-bold mb-3">Σύνδεσμοι</h3>
            <ul className="text-sm text-gray-400 space-y-1">
              <li>
                <Link href="/legal/privacy" className="hover:text-gray-200 hover:underline transition">
                  Πολιτική Απορρήτου
                </Link>
              </li>
              <li>
                <Link href="/legal/terms" className="hover:text-gray-200 hover:underline transition">
                  Όροι Χρήσης
                </Link>
              </li>
              <li>
                <Link href="/legal/faq" className="hover:text-gray-200 hover:underline transition">
                  Συχνές Ερωτήσεις
                </Link>
              </li>
            </ul>
          </div>

          {/* CTA / Μήνυμα */}
          <div className="order-5 md:ml-[-60px]">
            <h3 className="text-xl font-bold mb-3">Μείνετε ενημερωμένοι</h3>
            <p className="text-sm text-gray-400">
              Ακολουθήστε μας για ειδοποιήσεις και νέα σχετικά με σεισμούς στην Ελλάδα.
            </p>
          </div>
        </div>


        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-700/20 to-transparent my-6"></div>

        <div className="flex flex-col items-center text-center space-y-2 pb-10">
          <p className="text-xs text-gray-500 italic">
            <Copyright className="w-4 h-4 inline mr-1 text-gray-500" />
            {currentYear} Live Earthquakes Greece. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-2">
            <span className="text-xs text-gray-500 italic">Πηγές δεδομένων:</span>
            <Image
              src="/img/logo/image.jpg"
              alt="Πανεπιστήμιο Αθηνών - Γεωλογικό"
              width={150}
              height={40}
              className="rounded shadow-md"
            />
            <Image
              src="/img/logo/image2.png"
              alt="Εθνικό Αστεροσκοπείο Αθηνών"
              width={30}
              height={40}
              className="rounded shadow-md"
            />
          </div>
        </div>
      </div>

      <div
        className={cn(
          "absolute bottom-2 left-4 z-10 flex items-center gap-1",
          "text-[13px] text-gray-400 font-serif italic",
          "opacity-0 translate-y-4 transition-all duration-1000 delay-300",
          isIntersecting && "opacity-100 translate-y-0"
        )}
      >
        <span>Made with</span>
        <Heart className="w-4 h-4" />
        <span>by</span>
        <Link
          href="https://github.com/georgemos940"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 hover:text-gray-300 transition"
        >
          g.m
        </Link>
      </div>
    </footer>
  );
}
