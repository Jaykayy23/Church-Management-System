import { NextResponse } from "next/server";
import { requireRole } from "@/lib/server-auth";
import { getContributions } from "@/lib/data";

export async function GET() {
  const auth = await requireRole("staff");
  if (!auth.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: auth.status });
  }
  const data = await getContributions();
  const header = "Member,Type,Project,Date,Amount";
  const rows = data.map(
    (row) =>
      `"${row.member_name}","${row.type}","${row.project}","${row.date}","${row.amount}"`
  );
  const csv = [header, ...rows].join("\n");
  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=contributions.csv",
    },
  });
}
