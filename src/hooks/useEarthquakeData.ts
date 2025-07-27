// hooks/useEarthquakeData.ts
import { useEffect, useState } from "react";
import { EarthquakeEvent } from "@/types/earthquakeTypes";

export function useEarthquakeData() {
  const [earthquakes, setEarthquakes] = useState<{ features: EarthquakeEvent[] }>({ features: [] });

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch("/api/earthquakes");
        const data = await res.json();
        setEarthquakes(data);
      } catch (err) {
        console.error("Error fetching earthquakes", err);
      }
    };

    getData();
    const interval = setInterval(getData, 3000);
    return () => clearInterval(interval);
  }, []);

  return earthquakes;
}
