import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/server-auth";

const ContributionSchema = z.object({
  memberId: z.string().uuid(),
  type: z.string().min(2),
  project: z.string().min(2),
  date: z.string(),
  amount: z.number().nonnegative(),
});

export async function GET() {
  const auth = await requireRole("staff");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const rows = await prisma.contribution.findMany({
    orderBy: { date: "desc" },
    include: { member: { select: { firstName: true, lastName: true } } },
  });
  const data = rows.map((row) => ({
    id: row.id,
    member_name: `${row.member.firstName} ${row.member.lastName}`,
    type: row.type,
    project: row.project,
    date: row.date,
    amount: row.amount,
  }));
  return NextResponse.json({ data });
}

export async function POST(request: Request) {
  const auth = await requireRole("admin");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const body = await request.json();
  const parsed = ContributionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const row = await prisma.contribution.create({
    data: {
      memberId: parsed.data.memberId,
      type: parsed.data.type,
      project: parsed.data.project,
      date: new Date(parsed.data.date),
      amount: parsed.data.amount,
    },
  });
  return NextResponse.json({ data: row });
}
