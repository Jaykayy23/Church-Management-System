import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/server-auth";

const ContributionUpdateSchema = z.object({
  memberId: z.string().uuid().optional(),
  type: z.string().min(2).optional(),
  project: z.string().min(2).optional(),
  date: z.string().optional(),
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
  const row = await prisma.contribution.findUnique({ where: { id } });
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
  const parsed = ContributionUpdateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const { id } = await params;
  const data = parsed.data;
  const row = await prisma.contribution.update({
    where: { id },
    data: {
      memberId: data.memberId,
      type: data.type,
      project: data.project,
      date: data.date ? new Date(data.date) : undefined,
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
  await prisma.contribution.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
