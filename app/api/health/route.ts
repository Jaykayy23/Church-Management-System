import { NextResponse } from "next/server";
import { healthCheck } from "@/lib/data";

export async function GET() {
  try {
    const ok = await healthCheck();
    return NextResponse.json({ ok, ts: new Date().toISOString() }, { status: ok ? 200 : 503 });
  } catch {
    return NextResponse.json({ ok: false, ts: new Date().toISOString() }, { status: 503 });
  }
}
