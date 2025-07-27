// src/types/earthquakeTypes.ts

export interface EarthquakeEvent {
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
