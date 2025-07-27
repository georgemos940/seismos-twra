import { useEffect } from "react";
import { useMap } from "react-leaflet";

export default function ResizeHandler({ mapWidth }: { mapWidth: number }) {
  const map = useMap();

  useEffect(() => {
    const timeout = setTimeout(() => {
      map.invalidateSize();
    }, 100); // μικρό debounce delay

    return () => clearTimeout(timeout);
  }, [mapWidth, map]);

  return null;
}
