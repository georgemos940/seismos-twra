"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import L, { Map as LeafletMap } from "leaflet";
import EarthquakeMarker from "@/components/earthquakes/EarthquakeMarker";
import { EarthquakeEvent } from "@/types/earthquakeTypes";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/cn";

interface EarthquakeFeatureCollection {
  features: EarthquakeEvent[];
}

interface MapSectionProps {
  lat: number;
  lng: number;
  mapWidth: number;
  handleTileLoad: () => void;
  earthquakes: EarthquakeFeatureCollection;
  bounds: [[number, number], [number, number]];
  isLoading: boolean;
  showLoader: boolean;
  children?: React.ReactNode;
  selectedEarthquake?: EarthquakeEvent;
  zoomLevel: number;
}

const MapSection: React.FC<MapSectionProps> = ({
  lat,
  lng,
  handleTileLoad,
  earthquakes,
  isLoading,
  children,
  selectedEarthquake,
  zoomLevel,
}) => {
  const mapRef = useRef<LeafletMap | null>(null);

  const mapStyles = [
    {
      name: "Dark",
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      attribution: "&copy; OpenStreetMap contributors &copy; CartoDB",
    },
    {
      name: "Light",
      url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      attribution: "&copy; OpenStreetMap contributors &copy; CartoDB",
    },
    {
      name: "Satellite",
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
      attribution: "&copy; Esri &mdash; Sources: Esri, USGS, NOAA",
    },
    {
      name: "Terrain",
      url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
      attribution: "&copy; OpenTopoMap contributors",
    },
    {
      name: "OpenStreetMap",
      url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      attribution: "&copy; OpenStreetMap contributors",
    },
  ];

  const [selectedStyle, setSelectedStyle] = useState(mapStyles[2]);
  const [dropdownOpen, setDropdownOpen] = useState(false);


  useEffect(() => {
    if (!selectedEarthquake || !mapRef.current) return;

    const quakeLat = selectedEarthquake.geometry?.coordinates?.[1];
    const quakeLng = selectedEarthquake.geometry?.coordinates?.[0];

    if (quakeLat !== undefined && quakeLng !== undefined) {
      mapRef.current.flyTo([quakeLat, quakeLng], 12, { duration: 1.5 });
    }
  }, [selectedEarthquake]);

  const events = earthquakes?.features || [];

  const getColorForMagnitude = (magnitude: number) => {
    if (magnitude >= 7) return "#990000"; 
    if (magnitude >= 6.5) return "#cc3300"; 
    if (magnitude >= 6) return "#ff6600"; 
    if (magnitude >= 5.5) return "#ff9933"; 
    if (magnitude >= 5) return "#ffcc33"; 
    if (magnitude >= 4.5) return "#ffff66"; 
    if (magnitude >= 4) return "#99ff33"; 
    return "#cfcfcf"; 
  };

  const getCustomIcon = (magnitude: number | null, isLast: boolean = false) => {
    let svgIcon = "";
    let size = 40; 
    if (magnitude !== null) {
      const color = getColorForMagnitude(magnitude);
      size = Math.min(8 + Math.floor((magnitude - 1) * 2), 40); 

      if (magnitude > 6) {
        svgIcon = ` 
          <svg width="${size * 2}" height="${size * 2}" viewBox="0 0 ${size * 2} ${size * 2}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${(size * 2) / 2}" cy="${(size * 2) / 2}" r="${(size * 2) / 2 - 4}" fill="none" stroke="${color}" stroke-width="3">
              <animate attributeName="r" values="${(size * 2) / 2 - 4};${(size * 2) / 2 + 12};${(size * 2) / 2 - 4}" dur="2s" repeatCount="indefinite"/>
            </circle>
            <circle cx="${(size * 2) / 2}" cy="${(size * 2) / 2}" r="${(size * 2) / 4}" fill="${color}" stroke="none"/>
          </svg>
        `;
      } else {
        svgIcon = ` 
          <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
            <circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 2}" fill="${color}" stroke="none">
              ${magnitude > 4.5 ? 
                `<animate attributeName="r" values="${size / 2 - 2};${size / 2};${size / 2 - 2}" dur="2s" repeatCount="indefinite" keyTimes="0;0.5;1.0"/>`
                : ''
              }
            </circle>
            ${isLast ? `<animateTransform attributeName="transform" type="scale" values="1;1.2;1" dur="1s" repeatCount="indefinite"/>` : ''}
          </svg>
        `;
      }
    } else {
      svgIcon = `
        <svg width="9" height="9" viewBox="0 0 10 10" xmlns="http://www.w3.org/2000/svg">
          <circle cx="5" cy="5" r="3" fill="#cccccc" stroke="white" stroke-width="0.8" />
        </svg>
      `;
    }

    return new L.DivIcon({
      html: svgIcon,
      className: "border-0 bg-transparent",
      iconSize: [size, size], 
      iconAnchor: [size / 2, size / 2], 
    });
  };

  return (
    <div className="w-full h-full relative bg-black overflow-hidden shadow-xl z-[900] border-4 border-gray-700">
      {/* Loader */}
      {isLoading && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[999] transition-opacity duration-700 opacity-100">
          <div className="relative z-10 animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-gray-300"></div>
        </div>
      )}

      <div className="absolute top-4 right-4 z-[1100] bg-black/80 backdrop-blur-md rounded px-4 py-2 shadow-lg">
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="bg-gray-800 text-white text-sm px-3 py-1 rounded flex items-center gap-2"
          >
            Χάρτης: {selectedStyle.name}
            <span className={dropdownOpen ? "rotate-180" : ""}>▼</span>
          </button>
          {dropdownOpen && (
            <ul className="absolute right-0 mt-2 bg-gray-800 text-white rounded shadow-lg w-40" onMouseLeave={() => setDropdownOpen(false)}>
              {mapStyles.map((style) => (
                <li
                  key={style.name}
                  className={cn("px-4 py-2 hover:bg-gray-700 cursor-pointer", selectedStyle.name === style.name && "bg-gray-700")}
                  onClick={() => {
                    setSelectedStyle(style);
                    setDropdownOpen(false);
                  }}
                >
                  {style.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <MapContainer
        center={[lat, lng]}
        zoom={zoomLevel} 
        scrollWheelZoom={true}
        className="w-full h-full"
        style={{ background: "#000" }}
        attributionControl={false}
        zoomControl={false}
        minZoom={5}
        ref={mapRef}
      >
        <TileLayer
          url={selectedStyle.url}
          attribution={selectedStyle.attribution}
          eventHandlers={{ load: handleTileLoad }}
        />

        {children}

        {events.map((event, index) => {
          const magnitudeVal = event.properties?.magnitude ? parseFloat(event.properties.magnitude) : null;

          return (
            <EarthquakeMarker
              key={event.id || index}
              event={event}
              magnitudeVal={magnitudeVal}
              getCustomIcon={getCustomIcon}
            />
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapSection;
