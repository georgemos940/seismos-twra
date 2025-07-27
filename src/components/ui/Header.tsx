"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { label: "Αρχική", path: "/" },
    { label: "Σχετικά", path: "/info/about" },
    { label: "Επικοινωνία", path: "/info/contact" },
  ];

  useEffect(() => {

    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1100]
        bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900
        text-gray-100 shadow-lg border-b border-gray-700/50
        transition-all duration-300
        ${scrolled ? "py-1" : "py-4"} ${scrolled ? "min-h-[48px]" : "min-h-[72px]"}`}
    >
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 rounded-full border-2 border-gray-400 shadow-xl overflow-hidden">
            <Image
              src="/img/logo/logo2.png"
              alt="Logo"
              fill
              sizes="40px"
              style={{ objectFit: "cover" }}
              priority
            />
          </div>

          <div className="w-[1px] h-8 bg-gray-400/50"></div>

          <Link href="/" className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400 drop-shadow-md hover:from-gray-300 hover:to-gray-500 transition-all duration-500">
            Σεισμός Τώρα
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              className="text-base font-medium hover:text-gray-300 transition"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-gray-300 hover:text-white transition"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 space-y-2 bg-gray-900/95 backdrop-blur shadow-inner">
          {links.map((link, index) => (
            <Link
              key={index}
              href={link.path}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-200 text-base font-medium hover:text-white transition"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
