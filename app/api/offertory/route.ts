import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/server-auth";

const OffertorySchema = z.object({
  date: z.string(),
  type: z.string().min(2),
  givers: z.number().int().nonnegative(),
  amount: z.number().nonnegative(),
});

export async function GET() {
  const auth = await requireRole("staff");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const rows = await prisma.offertoryRecord.findMany({
    orderBy: { date: "desc" },
  });
  return NextResponse.json({ data: rows });
}

export async function POST(request: Request) {
  const auth = await requireRole("admin");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const body = await request.json();
  const parsed = OffertorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }
  const row = await prisma.offertoryRecord.create({
    data: {
      date: new Date(parsed.data.date),
      type: parsed.data.type,
      givers: parsed.data.givers,
      amount: parsed.data.amount,
    },
  });
  return NextResponse.json({ data: row });
}
