"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useInView from "@/hooks/useInView";
import { cn } from "@/lib/cn";

interface InstituteCardProps {
  name: string;
  description: string;
  image: string;
  link: string;
}

const InstituteCard: React.FC<InstituteCardProps> = ({
  name,
  description,
  image,
  link,
}) => {
  const { ref, isIntersecting } = useInView(0.1);

  return (
    <div
      ref={ref}
      className={cn(
        "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900",
        "rounded-lg overflow-hidden shadow-lg hover:shadow-xl",
        "transform transition-all duration-700",
        isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      )}
    >
      <div className="relative w-full h-48">
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 text-yellow-400">{name}</h3>
        <p className="text-sm text-gray-400 mb-4">{description}</p>
        <Link
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-gray-900 px-4 py-2 rounded-full font-semibold shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:scale-105"
        >
          Επισκεφτείτε →
        </Link>
      </div>
    </div>
  );
};

export default InstituteCard;
