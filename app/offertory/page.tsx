const stats = [
  { label: "This Month", value: "₦1,005,000" },
  { label: "Last Month", value: "₦2,925,000" },
  { label: "Total This Year", value: "₦5,910,000" },
];

const records = [
  {
    date: "Mar 2, 2026",
    type: "Sunday Service",
    givers: "312",
    amount: "₦485,000",
    chip: "orange",
  },
  {
    date: "Feb 23, 2026",
    type: "Sunday Service",
    givers: "340",
    amount: "₦520,000",
    chip: "orange",
  },
  {
    date: "Feb 16, 2026",
    type: "Special Offering",
    givers: "289",
    amount: "₦750,000",
    chip: "purple",
  },
  {
    date: "Feb 9, 2026",
    type: "Sunday Service",
    givers: "298",
    amount: "₦445,000",
    chip: "orange",
  },
  {
    date: "Feb 2, 2026",
    type: "Sunday Service",
    givers: "325",
    amount: "₦510,000",
    chip: "orange",
  },
  {
    date: "Jan 26, 2026",
    type: "Thanksgiving",
    givers: "410",
    amount: "₦1,200,000",
    chip: "orange",
  },
];

export default function OffertoryPage() {
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
          <button className="gp-muted-btn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 4v10" />
              <path d="M7 9l5 5 5-5" />
              <rect x="4" y="18" width="16" height="2" rx="1" />
            </svg>
            Export
          </button>
          <button className="gp-action-btn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            Record Entry
          </button>
        </div>
      </div>

      <section className="gp-offertory-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="gp-stat-mini">
            <div className="gp-event-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 3v18" />
                <path d="M16 7.5c0-1.9-1.8-3.5-4-3.5s-4 1.3-4 3.2c0 2 2 2.9 4 3.3 2 .4 4 1.3 4 3.4s-1.8 3.6-4 3.6-4-1.4-4-3.4" />
              </svg>
            </div>
            <div>
              <h4>{stat.label}</h4>
              <p>{stat.value}</p>
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
              <tr key={row.date}>
                <td>{row.date}</td>
                <td>
                  <span className={`gp-chip ${row.chip}`}>{row.type}</span>
                </td>
                <td>{row.givers}</td>
                <td className="amount">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
