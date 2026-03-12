import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/server-auth";
import { getSettings } from "@/lib/data";

const SettingsSchema = z.object({
  churchName: z.string().min(2),
  address: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().email().optional(),
  timezone: z.string().optional(),
  currency: z.string().optional(),
});

export async function GET() {
  const auth = await requireRole("staff");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const settings = await getSettings();
  return NextResponse.json({ data: settings });
}

export async function PATCH(request: Request) {
  const auth = await requireRole("admin");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }

  const body = await request.json();
  const parsed = SettingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const current = await getSettings();
  const data = parsed.data;
  const updated = await prisma.appSetting.update({
    where: { id: current.id },
    data: {
      churchName: data.churchName.trim(),
      address: data.address?.trim() || null,
      phone: data.phone?.trim() || null,
      email: data.email?.trim() || null,
      timezone: data.timezone?.trim() || current.timezone,
      currency: data.currency?.trim() || current.currency,
    },
  });

  return NextResponse.json({ data: updated });
}
