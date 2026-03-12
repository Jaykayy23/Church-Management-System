import { NextResponse } from "next/server";
import { requireRole } from "@/lib/server-auth";
import { getOffertoryRecords } from "@/lib/data";

export async function GET() {
  const auth = await requireRole("staff");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const data = await getOffertoryRecords();
  const header = "Date,Type,Givers,Amount";
  const rows = data.map(
    (row) => `"${row.date}","${row.type}","${row.givers}","${row.amount}"`
  );
  const csv = [header, ...rows].join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=offertory.csv",
    },
  });
}
