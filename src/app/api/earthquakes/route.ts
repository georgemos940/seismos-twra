import { NextResponse } from "next/server";
import { getEarthquakeData, initEarthquakeCron } from "@/cron/earthquakeCron";
initEarthquakeCron();// Call Cron Job



interface Feature {
  id: string;
  properties?: {
    time?: string;
    magnitude?: string;
    place?: string;
    [key: string]: unknown; 
  };
  geometry?: {
    coordinates?: [number, number, number];
  };
}

// === GET route ===
export async function GET() {
  try {
    const cachedData = await getEarthquakeData();
    if (!cachedData) {
      return NextResponse.json(
        { error: "Data is not available right now." },
        { status: 503 }
      );
    }

    // Filter σεισμούς τελευταίων 3 ημερών
    if (cachedData.features && Array.isArray(cachedData.features)) {
      const now = new Date();
      cachedData.features = cachedData.features.filter((feature: Feature) => {
        const quakeTime = feature.properties?.time;
        if (!quakeTime) return false;
        const quakeDate = new Date(quakeTime);
        const daysDifference =
          (now.getTime() - quakeDate.getTime()) / (1000 * 60 * 60 * 24);
        return daysDifference <= 3;
      });
    }

    return NextResponse.json(cachedData);
  } catch (error) {
    console.error("Error GET /api/earthquakes:", error);
    return NextResponse.json(
      { error: "Error in fetch." },
      { status: 500 }
    );
  }
}
