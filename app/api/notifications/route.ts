import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/server-auth";

export async function GET() {
  const auth = await requireRole("staff");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const now = new Date();
  const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const [upcomingEvents, newMembers, recentOffertory] = await Promise.all([
    prisma.event.findMany({
      where: { startAt: { gte: now, lte: nextWeek } },
      orderBy: { startAt: "asc" },
      take: 4,
      select: { id: true, title: true, startAt: true },
    }),
    prisma.member.findMany({
      where: { joinedAt: { gte: weekAgo } },
      orderBy: { joinedAt: "desc" },
      take: 3,
      select: { id: true, firstName: true, lastName: true, joinedAt: true },
    }),
    prisma.offertoryRecord.findMany({
      where: { date: { gte: weekAgo } },
      orderBy: { date: "desc" },
      take: 3,
      select: { id: true, type: true, date: true, amount: true },
    }),
  ]);

  const notifications = [
    ...upcomingEvents.map((event) => ({
      id: `event-${event.id}`,
      title: event.title,
      detail: `Event on ${event.startAt.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })}`,
      href: "/events",
      kind: "event",
      timestamp: event.startAt.toISOString(),
    })),
    ...newMembers.map((member) => ({
      id: `member-${member.id}`,
      title: `${member.firstName} ${member.lastName}`,
      detail: `New member joined ${member.joinedAt.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })}`,
      href: "/members",
      kind: "member",
      timestamp: member.joinedAt.toISOString(),
    })),
    ...recentOffertory.map((record) => ({
      id: `offertory-${record.id}`,
      title: record.type,
      detail: `Offertory recorded ${record.date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      })}`,
      href: "/offertory",
      kind: "offertory",
      timestamp: record.date.toISOString(),
    })),
  ].sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1));

  return NextResponse.json({ data: notifications });
}
