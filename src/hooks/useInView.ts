// src/hooks/useInView.ts
"use client";
import { useEffect, useRef, useState } from "react";

export default function useInView(threshold = 0.1) {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsIntersecting(true);
          observer.disconnect(); // Μόλις φανεί, δεν ξαναπαρακολουθεί
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isIntersecting };
}
