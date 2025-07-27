"use client";

import React, { useState } from "react";
import EarthquakeList from "@/components/earthquakes/EarthquakeList";
import { cn } from "@/lib/cn";
import useInView from "@/hooks/useInView";
import { EarthquakeEvent } from "@/types/earthquakeTypes";

interface EarthquakePanelProps {
  mapWidth: number;
  mapHeight: number;
  isMobile: boolean;
  earthquakes: EarthquakeEvent[];
  onEarthquakeClick: (event: EarthquakeEvent) => void;
}

const EarthquakePanel: React.FC<EarthquakePanelProps> = ({
  mapHeight,
  isMobile,
  earthquakes,
  onEarthquakeClick,
}) => {
  const [minMagnitude, setMinMagnitude] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tempMagnitude, setTempMagnitude] = useState(minMagnitude);

  const handleIncrease = () => {
    if (tempMagnitude < 7)
      setTempMagnitude((prev) => parseFloat((prev + 0.1).toFixed(1)));
  };

  const handleDecrease = () => {
    if (tempMagnitude > 0)
      setTempMagnitude((prev) => parseFloat((prev - 0.1).toFixed(1)));
  };

  const handleManualChange = (value: number) => {
    if (value >= 0 && value <= 7) {
      setTempMagnitude(parseFloat(value.toFixed(1)));
    }
  };

  const handleApply = () => {
    setMinMagnitude(tempMagnitude);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { ref, isIntersecting } = useInView(0.2);

  const calculatedHeight = isMobile
    ? `calc(170vh - ${mapHeight}vh - 10px)`
    : "100%";

  return (
    <div
      className={cn(
        "flex-1 w-full md:w-auto flex flex-col",
        "bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900"
      )}
      style={{ zIndex: 1, height: calculatedHeight }}
    >
      <div
        className={cn(
          "flex flex-col items-center justify-start",
          "px-6 py-6 flex-1 overflow-hidden"
        )}
        style={{ userSelect: "none" }}
      >
        <h1
          ref={ref}
          className={cn(
            "text-3xl font-bold text-white drop-shadow-md mb-2 transition-all duration-700",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          Live Σεισμοί Ελλάδα
        </h1>

        <p
          className={cn(
            "text-gray-300 max-w-md text-center mb-4 text-sm leading-relaxed transition-all duration-700",
            isIntersecting ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          Παρακολουθήστε σεισμούς σε πραγματικό χρόνο στην Ελλάδα. Μείνετε
          ενημερωμένοι για τη σεισμική δραστηριότητα της περιοχής.
        </p>

        <div
          className="w-16 h-[2px] bg-gradient-to-r from-gray-500 to-gray-600 rounded-full mb-4"
        ></div>

        <div className="mb-4 flex items-center justify-between w-full max-w-xl">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-yellow-600 hover:bg-yellow-700 text-gray-900 px-3 py-1 rounded text-sm font-semibold shadow hover:shadow-lg transition duration-300"
          >
            Ρύθμιση Ρίχτερ
          </button>
        </div>

        <div className="w-full max-w-xl h-full overflow-y-auto min-h-0">
          <EarthquakeList
            earthquakes={{ features: earthquakes }}
            minMagnitude={minMagnitude}
            isModalOpen={isModalOpen}
            tempMagnitude={tempMagnitude}
            onIncrease={handleIncrease}
            onDecrease={handleDecrease}
            onApply={handleApply}
            onCancel={handleCancel}
            onManualChange={handleManualChange}
            onEarthquakeClick={onEarthquakeClick}
          />
        </div>
      </div>
    </div>
  );
};

export default EarthquakePanel;
