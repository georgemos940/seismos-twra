"use client";

import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";
import ResizeHandler from "@/components/shared/ResizeHandler";
import EarthquakePanel from "@/components/earthquakes/EarthquakePanel";
import HeroSection from "@/components/ui/HeroSection";
import BottomSection from "@/components/ui/BottomSection";
import HeaderTransitionSection from "@/components/ui/HeaderTransitionSection";
import { EarthquakeEvent } from "@/types/earthquakeTypes";
import { useScreenSize } from "@/hooks/useScreenSize";
import { useEarthquakeData } from "@/hooks/useEarthquakeData";
import { useMapResize } from "@/hooks/useMapResize";
import { useState } from "react";

const MapSection = dynamic(() => import("@/components/maps/MapSection"), { ssr: false });

export default function Home() {
  const [lat] = useState(37.9838);
  const [lng] = useState(23.7275);
  const [mapWidth, setMapWidth] = useState(50);
  const [mapHeight, setMapHeight] = useState(50);
  const [selectedEarthquake, setSelectedEarthquake] = useState<EarthquakeEvent>(); 
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);

  const earthquakes = useEarthquakeData();
  const isMobile = useScreenSize();
  const { onMouseDown, onTouchStart } = useMapResize(isMobile, setMapWidth, setMapHeight);

  const bounds = [[33.5, 19], [42.5, 30]] as [[number, number], [number, number]];
  
  const mapStyle = isMobile
    ? { height: `${mapHeight}vh`, width: "100%" }
    : { width: `${mapWidth}%`, height: "100%" };

  const handleTileLoad = () => {
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => setShowLoader(false), 500);
    }, 1000);
  };

  return (
    <>
      <section className="w-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
        <HeroSection />
        <HeaderTransitionSection />
      </section>

      <div className="flex flex-col md:flex-row w-full h-auto md:h-screen relative">
        <div className="order-1 md:order-none" style={mapStyle}>
          <MapSection
            lat={lat}
            lng={lng}
            mapWidth={mapWidth}
            handleTileLoad={handleTileLoad}
            earthquakes={earthquakes}
            bounds={bounds}
            isLoading={isLoading}
            showLoader={showLoader}
            selectedEarthquake={selectedEarthquake ?? undefined}
            zoomLevel={isMobile ? 6 : 7}
          >
            <ResizeHandler mapWidth={mapWidth} />
          </MapSection>
        </div>

        <div
          className="order-2 md:order-none flex-shrink-0 bg-gray-800 cursor-row-resize md:cursor-col-resize"
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          style={isMobile ? { height: "10px", width: "100%" } : { width: "6px", height: "100%" }}
        />

        <div
          className={`
            order-3 md:order-none w-full overflow-y-auto
            ${isMobile ? "min-h-[30vh]" : "md:flex-1"}
          `}
        >
          <EarthquakePanel
            mapWidth={mapWidth}
            mapHeight={mapHeight}
            isMobile={isMobile}
            earthquakes={earthquakes.features}
            onEarthquakeClick={setSelectedEarthquake}
          />
        </div>
      </div>

      <BottomSection />
    </>
  );
}
