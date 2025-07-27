import fs from "fs/promises";
import path from "path";
import { fetchEarthquakes } from "@/services/fetchEarthquakes";
import { registerCronJob  } from "@/cron/cronManager";

const CACHE_FILE = path.resolve("./src/data/earthquakeCache.json");

interface RawFeature {
  id: string;
  properties: {
    time: string;
    magnitude: string;
    place: string;
    agency?: string;
    status?: string;
    url?: string;
    eventID?: string;
    type?: string;
  };
  geometry: {
    coordinates: number[];
  };
}

export interface Feature {
  id: string;
  properties: {
    time: string;
    magnitude: string;
    place: string;
    agency?: string;
    status?: string;
    url?: string;
    eventID?: string;
    type?: string;
  };
  geometry: {
    coordinates: [number, number, number];
  };
}


//Begin the cron job!
export function initEarthquakeCron() { 
  registerCronJob("earthquake-cron", "*/1 * * * *", async () => {
    const updated = await updateEarthquakeData();
    console.log(`Update cache with ${updated.features.length} earthquakes`);
  });
}

//Give me the earthquakedata from cache file
export async function getEarthquakeData(): Promise<{ features: Feature[] } | null> {
  try {
    const file = await fs.readFile(CACHE_FILE, "utf-8");
    const cached = JSON.parse(file);
    return cached.data;
  } catch {
    return null;
  }
}



// Update cache with new earthquakedata
export async function updateEarthquakeData(): Promise<{ features: Feature[] }> {
  const newData = await fetchEarthquakes(3, 1);
  const now = new Date();

  let existingData: Feature[] = [];
  try {
    const file = await fs.readFile(CACHE_FILE, "utf-8");
    const cached = JSON.parse(file);
    if (cached.data?.features) {
      existingData = cached.data.features;
    }
  } catch {
    console.log("Δεν βρέθηκε υπάρχον cache.");
  }

  const combinedData: Feature[] = [];

  if (Array.isArray(newData.features)) {
    newData.features.forEach((newFeature: RawFeature) => {
      const coords = newFeature.geometry?.coordinates || [];
      const coordsTuple: [number, number, number] = [
        coords[0] ?? 0,
        coords[1] ?? 0,
        coords[2] ?? 0,
      ];
      const existingFeature = existingData.find((f) => f.id === newFeature.id);

      combinedData.push({
        id: newFeature.id,
        properties: {
          ...existingFeature?.properties,
          ...newFeature.properties,
        },
        geometry: {
          coordinates: coordsTuple,
        },
      });
    });
  }

  const filtered = combinedData.filter((f) => {
    const t = f.properties.time;
    if (!t) return false;
    const dt = new Date(t);
    return (now.getTime() - dt.getTime()) / (1000 * 60 * 60 * 24) <= 3;
  });

  const unique = Array.from(new Map(filtered.map((f) => [f.id, f])).values());

  const cachedData = {
    lastUpdated: new Date().toISOString(),
    data: { features: unique },
  };

  await fs.writeFile(CACHE_FILE, JSON.stringify(cachedData, null, 2));
  return cachedData.data;
}

