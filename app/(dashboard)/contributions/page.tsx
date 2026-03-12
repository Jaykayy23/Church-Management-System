import { getContributions } from "@/lib/data";
import { formatNaira } from "@/lib/format";
import Link from "next/link";

const chipMap: Record<string, string> = {
  Tithe: "orange",
  Offering: "green",
  Donation: "blue",
  Seed: "orange",
};

export const dynamic = "force-dynamic";

export default async function ContributionsPage() {
  const contributions = await getContributions();
  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Contributions</h1>
          <p className="gp-page-subtitle">
            Track individual member tithes, offerings and donations.
          </p>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <Link className="gp-muted-btn" href="/api/export/contributions">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v10" />
              <path d="M7 9l5 5 5-5" />
              <rect x="4" y="18" width="16" height="2" rx="1" />
            </svg>
            Export
          </Link>
          <Link className="gp-action-btn" href="/contributions/new">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Record Contribution
          </Link>
        </div>
      </div>

      <div className="gp-search" style={{ marginBottom: "16px" }}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input placeholder="Search by member..." />
      </div>

      <div className="gp-card">
        <p className="gp-panel-title" style={{ marginBottom: "12px" }}>
          Recent Contributions
        </p>
        <table className="gp-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Type</th>
              <th>Project</th>
              <th>Date</th>
              <th className="amount">Amount</th>
            </tr>
          </thead>
          <tbody>
            {contributions.map((row) => (
              <tr key={row.id}>
                <td>{row.member_name}</td>
                <td>
                  <span className={`gp-chip ${chipMap[row.type] ?? "orange"}`}>
                    {row.type}
                  </span>
                </td>
                <td>{row.project}</td>
                <td>
                  {new Date(row.date).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </td>
                <td className="amount">{formatNaira(row.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
