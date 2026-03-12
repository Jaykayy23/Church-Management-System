import { getOffertoryRecords, getOffertoryStats } from "@/lib/data";
import { formatNaira } from "@/lib/format";
import Link from "next/link";

const chipMap: Record<string, string> = {
  "Sunday Service": "orange",
  "Special Offering": "purple",
  Thanksgiving: "orange",
};

export const dynamic = "force-dynamic";

export default async function OffertoryPage() {
  const [stats, records] = await Promise.all([
    getOffertoryStats(),
    getOffertoryRecords(),
  ]);
  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Offertory</h1>
          <p className="gp-page-subtitle">
            Track and manage church offertory records.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link className="gp-muted-btn" href="/api/export/offertory">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v10" />
              <path d="M7 9l5 5 5-5" />
              <rect x="4" y="18" width="16" height="2" rx="1" />
            </svg>
            Export
          </Link>
          <Link className="gp-action-btn" href="/offertory/new">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Record Entry
          </Link>
        </div>
      </div>

      <section className="gp-offertory-stats">
        {[
          { label: "This Month", value: stats.thisMonth },
          { label: "Last Month", value: stats.lastMonth },
          { label: "Total This Year", value: stats.thisYear },
        ].map((stat) => (
          <div key={stat.label} className="gp-stat-mini">
            <div className="gp-event-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v18" />
                <path d="M16 7.5c0-1.9-1.8-3.5-4-3.5s-4 1.3-4 3.2c0 2 2 2.9 4 3.3 2 .4 4 1.3 4 3.4s-1.8 3.6-4 3.6-4-1.4-4-3.4" />
              </svg>
            </div>
            <div>
              <h4>{stat.label}</h4>
              <p>{formatNaira(stat.value)}</p>
            </div>
          </div>
        ))}
      </section>

      <div className="gp-card">
        <p className="gp-panel-title" style={{ marginBottom: "12px" }}>
          Offertory Records
        </p>
        <table className="gp-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Type</th>
              <th>Givers</th>
              <th className="amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            {records.map((row) => (
              <tr key={row.id}>
                <td>
                  {new Date(row.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td>
                  <span className={`gp-chip ${chipMap[row.type] ?? "orange"}`}>
                    {row.type}
                  </span>
                </td>
                <td>{row.givers}</td>
                <td className="amount">{formatNaira(row.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
