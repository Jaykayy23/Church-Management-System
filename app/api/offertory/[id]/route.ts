import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/server-auth";

const OffertoryUpdateSchema = z.object({
  date: z.string().optional(),
  type: z.string().min(2).optional(),
  givers: z.number().int().nonnegative().optional(),
  amount: z.number().nonnegative().optional(),
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
  const row = await prisma.offertoryRecord.findUnique({ where: { id } });
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
  const parsed = OffertoryUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { id } = await params;
  const data = parsed.data;
  const row = await prisma.offertoryRecord.update({
    where: { id },
    data: {
      date: data.date ? new Date(data.date) : undefined,
      type: data.type,
      givers: data.givers,
      amount: data.amount,
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
  await prisma.offertoryRecord.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
