import { NextResponse } from "next/server";
import { requireRole } from "@/lib/server-auth";
import { getDashboardStats, getUpcomingEvents, getRecentOffertory } from "@/lib/data";

export async function GET() {
  const auth = await requireRole("staff");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const [stats, events, offertory] = await Promise.all([
    getDashboardStats(),
    getUpcomingEvents(4),
    getRecentOffertory(4),
  ]);
  return NextResponse.json({ stats, events, offertory });
}
