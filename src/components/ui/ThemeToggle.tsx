"use client";

import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    setIsDarkMode(currentTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    const currentTheme = html.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";
    html.setAttribute("data-theme", newTheme);
    setIsDarkMode(newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white border border-gray-600 p-3 rounded-full shadow-lg hover:scale-105 hover:shadow-xl transition duration-300 ease-in-out"
      aria-label="Toggle Theme"
    >
      {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
    </button>
  );
}
