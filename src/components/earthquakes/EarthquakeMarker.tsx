"use client";

import React from "react";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

interface EarthquakeEvent {
  id: string;
  properties?: {
    time?: string;
    magnitude?: string;
    place?: string;
    depth?: string;
    agency?: string;
    status?: string;
    url?: string;
  };
  geometry?: {
    coordinates?: [number, number, number];
  };
}

interface EarthquakeMarkerProps {
  event: EarthquakeEvent;
  magnitudeVal: number | null;
  getCustomIcon: (magnitude: number | null, isLast: boolean) => L.DivIcon;
  isLast?: boolean; 
}

const EarthquakeMarker: React.FC<EarthquakeMarkerProps> = ({
  event,
  magnitudeVal,
  getCustomIcon,
  isLast = false, 
}) => {
  const latitude = event.geometry?.coordinates?.[1];
  const longitude = event.geometry?.coordinates?.[0];

  const magnitude = magnitudeVal ? magnitudeVal.toFixed(1) : "N/A";
  const description = event.properties?.place || "Άγνωστη";
  const dateTime = event.properties?.time
    ? new Date(event.properties.time).toLocaleString("el-GR")
    : "Άγνωστη";
  const depth = event.geometry?.coordinates?.[2]
    ? `${(event.geometry.coordinates[2]).toFixed(1)} km`
    : "Άγνωστο";

  const agency = event.properties?.agency || "Άγνωστο";

  const isAutomatic =
    !event.properties?.agency || event.properties.agency === "AUT";

  if (latitude === undefined || longitude === undefined) return null;

  return (
    <Marker
      position={[latitude, longitude]}
      icon={getCustomIcon(magnitudeVal, isLast)}
    >
      <Popup>
        <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/80 to-black/80 text-white p-4 rounded-lg shadow-lg w-80 relative">
          {/* Κουμπί Χ */}
          <button
            type="button"
            className="absolute top-2 right-2 bg-blue-600 rounded-full px-2 py-0.5 text-sm text-white hover:bg-blue-700"
            onClick={(e) => {
              e.stopPropagation();
              const popupEl = (e.target as HTMLElement).closest(".leaflet-popup");
              if (popupEl && popupEl.parentNode) {
                (popupEl.parentNode as Node).removeChild(popupEl);
              }
            }}
          >
            Χ
          </button>

          <h3 className="text-lg font-semibold text-yellow-400 mb-2">
            Σεισμική Δραστηριότητα
          </h3>
          <p className="mb-1">
            <span className="font-semibold text-gray-300">Τοποθεσία:</span>{" "}
            {description}
          </p>
          <p className="mb-1">
            <span className="font-semibold text-gray-300">Μέγεθος:</span>{" "}
            {magnitude}
          </p>
          <p className="mb-1">
            <span className="font-semibold text-gray-300">Ημερομηνία:</span>{" "}
            {dateTime}
          </p>
          <p className="mb-1">
            <span className="font-semibold text-gray-300">Βάθος:</span>{" "}
            {depth}
          </p>
          <p className="mb-1">
            <span className="font-semibold text-gray-300">Agency:</span>{" "}
            {agency}
          </p>
          <p className="mb-1">
            <span className="font-semibold text-gray-300">Latitude:</span>{" "}
            {latitude?.toFixed(4)}
          </p>
          <p className="mb-1">
            <span className="font-semibold text-gray-300">Longitude:</span>{" "}
            {longitude?.toFixed(4)}
          </p>
          {isAutomatic && (
            <p className="mb-1 text-xs italic text-gray-400">
              Αυτόματη λύση
            </p>
          )}
          {latitude && longitude && (
            <a
              href={`https://www.google.com/maps?q=${latitude},${longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="block mt-1 text-blue-400 hover:text-blue-500 underline text-sm"
            >
              Προβολή στο Google Maps
            </a>
          )}
        </div>
      </Popup>
    </Marker>
  );
};

export default EarthquakeMarker;
