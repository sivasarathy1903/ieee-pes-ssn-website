import type { IncomingMessage, ServerResponse } from "http";
import { db } from "./_lib/firebaseAdmin.js";

const toIso = (value: unknown) => {
  if (value && typeof value === "object" && "toDate" in value) {
    const date = (value as { toDate: () => Date }).toDate();
    return date.toISOString();
  }
  return null;
};

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.setHeader("Allow", "GET");
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  try {
    const eventsCollection = db.collection("events");
    const [currentEventSnapshot, pastEventsSnapshot] = await Promise.all([
      eventsCollection.where("isCurrent", "==", true).get(),
      eventsCollection.where("isCurrent", "==", false).get(),
    ]);

    const mapEvent = (doc: { id: string; data: () => Record<string, unknown> }) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        startDate: toIso(data.startDate),
      };
    };

    const sortByStartDateDesc = (a: { startDate?: string | null }, b: { startDate?: string | null }) => {
      const aTime = a.startDate ? new Date(a.startDate).getTime() : 0;
      const bTime = b.startDate ? new Date(b.startDate).getTime() : 0;
      return bTime - aTime;
    };

    const currentEvents = currentEventSnapshot.docs.map(mapEvent).sort(sortByStartDateDesc);
    const pastEvents = pastEventsSnapshot.docs.map(mapEvent).sort(sortByStartDateDesc);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.end(JSON.stringify({ currentEvents, pastEvents }));
  } catch (error) {
    console.error("Events API error:", error);
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Failed to fetch events" }));
  }
}
