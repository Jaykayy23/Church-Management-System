const contributions = [
  {
    name: "Adebayo Johnson",
    type: "Tithe",
    project: "General Fund",
    date: "Mar 5, 2026",
    amount: "₦150,000",
    chip: "orange",
  },
  {
    name: "Grace Okonkwo",
    type: "Offering",
    project: "Building Fund",
    date: "Mar 4, 2026",
    amount: "₦50,000",
    chip: "green",
  },
  {
    name: "Emmanuel Eze",
    type: "Tithe",
    project: "General Fund",
    date: "Mar 3, 2026",
    amount: "₦200,000",
    chip: "orange",
  },
  {
    name: "Blessing Nwachukwu",
    type: "Donation",
    project: "Youth Center",
    date: "Mar 2, 2026",
    amount: "₦500,000",
    chip: "blue",
  },
  {
    name: "Samuel Adeyemi",
    type: "Tithe",
    project: "General Fund",
    date: "Mar 2, 2026",
    amount: "₦75,000",
    chip: "orange",
  },
  {
    name: "Mercy Okafor",
    type: "Seed",
    project: "Outreach",
    date: "Mar 1, 2026",
    amount: "₦100,000",
    chip: "orange",
  },
];

export default function ContributionsPage() {
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
            Record Contribution
          </button>
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
              <tr key={row.name + row.date}>
                <td>{row.name}</td>
                <td>
                  <span className={`gp-chip ${row.chip}`}>{row.type}</span>
                </td>
                <td>{row.project}</td>
                <td>{row.date}</td>
                <td className="amount">{row.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
