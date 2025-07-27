import xml2js from "xml2js";

export async function fetchEarthquakes(lastDays: number, minMagnitude: number) {
  const now = new Date();
  const endTime = now.toISOString().split(".")[0] + "Z";
  const startTime = new Date(now.getTime() - lastDays * 24 * 60 * 60 * 1000)
    .toISOString()
    .split(".")[0] + "Z";
  const url = `https://eida.gein.noa.gr/fdsnws/event/1/query?starttime=${startTime}&endtime=${endTime}&minmagnitude=${minMagnitude}&maxlatitude=42.5&minlatitude=33.5&maxlongitude=30&minlongitude=19&format=xml`;
  const res = await fetch(url);
  const xml = await res.text();
  const parsed = await xml2js.parseStringPromise(xml, { explicitArray: false });

  const events = parsed["q:quakeml"]?.eventParameters?.event;
  let features = [];

  if (Array.isArray(events)) {
    features = events.map((event) => {
      const evalStatus =
        event.magnitude?.evaluationStatus ||
        event.origin?.evaluationStatus ||
        "";

      return {
        id: event.$.publicID || event.eventID || Date.now().toString(),
        properties: {
          time: event.origin?.time?.value || "",
          magnitude: event.magnitude?.mag?.value || "",
          place: event.description?.text || "",
          agency: event.creationInfo?.agencyID || "",
          status: evalStatus,  
          url: event.magnitude?.originID || "",
        },
        geometry: {
          coordinates: [
            parseFloat(event.origin?.longitude?.value || 0),
            parseFloat(event.origin?.latitude?.value || 0),
            parseFloat(event.origin?.depth?.value || 0),
          ],
        },
      };
    });
  } else if (typeof events === "object" && events !== null) {
    const evalStatus =
      events.magnitude?.evaluationStatus ||
      events.origin?.evaluationStatus ||
      "";

    features.push({
      id: events.$.publicID || events.eventID || Date.now().toString(),
      properties: {
        time: events.origin?.time?.value || "",
        magnitude: events.magnitude?.mag?.value || "",
        place: events.description?.text || "",
        agency: events.creationInfo?.agencyID || "",
        status: evalStatus,  
        url: events.magnitude?.originID || "",
      },
      geometry: {
        coordinates: [
          parseFloat(events.origin?.longitude?.value || 0),
          parseFloat(events.origin?.latitude?.value || 0),
          parseFloat(events.origin?.depth?.value || 0),
        ],
      },
    });
  }

  return { features };
}
