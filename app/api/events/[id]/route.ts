import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/server-auth";

const EventUpdateSchema = z.object({
  title: z.string().min(2).optional(),
  startAt: z.string().optional(),
  location: z.string().min(2).optional(),
  expectedCount: z.number().int().nonnegative().optional(),
  category: z.string().min(2).optional(),
});

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("staff");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const { id } = await params;
  const row = await prisma.event.findUnique({ where: { id } });
  return NextResponse.json({ data: row });
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("admin");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const body = await request.json();
  const parsed = EventUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const { id } = await params;
  const data = parsed.data;
  const row = await prisma.event.update({
    where: { id },
    data: {
      title: data.title,
      startAt: data.startAt ? new Date(data.startAt) : undefined,
      location: data.location,
      expectedCount: data.expectedCount,
      category: data.category,
    },
  });
  return NextResponse.json({ data: row });
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await requireRole("admin");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const { id } = await params;
  await prisma.event.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
