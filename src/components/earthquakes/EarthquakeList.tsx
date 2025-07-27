"use client";

import React, { useEffect, useRef } from "react";
import MagnitudeModal from "@/components/shared/MagnitudeModal";
import { cn } from "@/lib/cn";
import { EarthquakeEvent } from "@/types/earthquakeTypes";

interface EarthquakeProps {
  earthquakes: { features: EarthquakeEvent[] };
  minMagnitude: number;
  isModalOpen: boolean;
  tempMagnitude: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onApply: () => void;
  onCancel: () => void;
  onManualChange: (value: number) => void;
  onEarthquakeClick: (event: EarthquakeEvent) => void;
}

const EarthquakeList: React.FC<EarthquakeProps> = ({
  earthquakes,
  minMagnitude,
  isModalOpen,
  tempMagnitude,
  onIncrease,
  onDecrease,
  onApply,
  onCancel,
  onManualChange,
  onEarthquakeClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isModalOpen && containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [isModalOpen]);

  const eventsArray = earthquakes?.features || [];

  if (eventsArray.length === 0) {
    return (
      <p className="text-sm text-gray-400">
        Δεν βρέθηκαν σεισμοί τις τελευταίες 3 ημέρες.
      </p>
    );
  }

  const sortedEvents = [...eventsArray].sort((a, b) => {
    const timeA = new Date(a.properties?.time || "").getTime();
    const timeB = new Date(b.properties?.time || "").getTime();
    return timeB - timeA;
  });

  const filteredEvents = sortedEvents.filter((event) => {
    const magnitudeVal = event.properties?.magnitude
      ? parseFloat(event.properties.magnitude)
      : 0;
    return magnitudeVal >= minMagnitude;
  });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-full rounded-xl border border-gray-700 backdrop-blur-md bg-gray-800/30 p-4 shadow-2xl custom-scrollbar",
        isModalOpen ? "overflow-hidden" : "overflow-y-auto"
      )}
    >
      {filteredEvents.length === 0 ? (
        <p className="text-sm text-gray-400">
          Δεν βρέθηκαν σεισμοί με μέγεθος &ge; {minMagnitude}.
        </p>
      ) : (
        filteredEvents.map((event, index) => {
          const location = event.properties?.place || "Άγνωστη";
          const magnitudeVal = event.properties?.magnitude
            ? parseFloat(event.properties.magnitude)
            : null;
          const magnitude = magnitudeVal ? magnitudeVal.toFixed(1) : "N/A";
          const date = event.properties?.time
            ? new Date(event.properties.time).toLocaleString("el-GR")
            : "Άγνωστη";
          const agency = event.properties?.agency || "Άγνωστη";
          const depth = event.geometry?.coordinates?.[2]
            ? `${(parseFloat(event.geometry.coordinates[2].toString()) / 1000).toFixed(1)} km`
            : "Άγνωστο";
          const status = event.properties?.status || "Άγνωστο";

          const animationClass = cn({
            "animate-pulse-fast border-red-600": magnitudeVal !== null && magnitudeVal >= 6,
            "animate-pulse-slow border-orange-500": magnitudeVal !== null && magnitudeVal >= 5 && magnitudeVal < 6,
            "animate-fade-slow border-yellow-500": magnitudeVal !== null && magnitudeVal >= 4 && magnitudeVal < 5,
          });

          return (
            <div
              key={event.id || index}
              onClick={() => onEarthquakeClick(event)}
              className={cn(
                "bg-gradient-to-br from-gray-900/70 to-gray-800/70 p-4 mb-3 rounded-lg text-sm shadow-lg border border-gray-700/50 transition duration-300 hover:bg-gray-900/90 cursor-pointer",
                animationClass
              )}
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      "text-lg font-bold px-2 py-1 rounded shadow-inner",
                      magnitudeVal && magnitudeVal >= 6 && "text-red-400 bg-red-600/30",
                      magnitudeVal && magnitudeVal >= 5 && magnitudeVal < 6 && "text-orange-400 bg-orange-600/20",
                      magnitudeVal && magnitudeVal >= 4 && magnitudeVal < 5 && "text-yellow-400 bg-yellow-600/20"
                    )}
                  >
                    Ρίχτερ {magnitude}
                  </span>
                  {magnitudeVal !== null && magnitudeVal >= 5 && (
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-600"></span>
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-400">{date}</span>
              </div>
              <p className="text-gray-300 mb-1">
                <strong>Τοποθεσία:</strong> {location}
              </p>
              <div className="flex flex-wrap gap-2 text-gray-400 text-xs">
                <span className="px-2 py-1 bg-gray-700/40 rounded-full">
                  Βάθος: {depth}
                </span>
                <span className="px-2 py-1 bg-gray-700/40 rounded-full">
                  Agency: {agency}
                </span>
                <span className="px-2 py-1 bg-gray-700/40 rounded-full">
                  Status: {status}
                </span>
              </div>
            </div>
          );
        })
      )}
      {isModalOpen && (
        <MagnitudeModal
          tempMagnitude={tempMagnitude}
          onIncrease={onIncrease}
          onDecrease={onDecrease}
          onApply={onApply}
          onCancel={onCancel}
          onManualChange={onManualChange}
        />
      )}
    </div>
  );
};

export default EarthquakeList;
