import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/server-auth";

const EventSchema = z.object({
  title: z.string().min(2),
  startAt: z.string(),
  location: z.string().min(2),
  expectedCount: z.number().int().nonnegative(),
  category: z.string().min(2),
});

export async function GET() {
  const auth = await requireRole("staff");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const rows = await prisma.event.findMany({
    orderBy: { startAt: "asc" },
  });
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireRole("admin");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const body = await request.json();
  const parsed = EventSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const row = await prisma.event.create({
    data: {
      title: parsed.data.title,
      startAt: new Date(parsed.data.startAt),
      location: parsed.data.location,
      expectedCount: parsed.data.expectedCount,
      category: parsed.data.category,
    },
  });
  return NextResponse.json({ data: row });
}
