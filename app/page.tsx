const stats = [
  {
    label: "Total Members",
    value: "1,247",
    meta: "+12%",
    color: "blue",
    icon: "users",
  },
  {
    label: "This Month's Offertory",
    value: "₦2,450,000",
    meta: "+8.2%",
    color: "orange",
    icon: "cash",
  },
  {
    label: "Upcoming Events",
    value: "6",
    meta: "This week",
    color: "green",
    icon: "calendar",
  },
  {
    label: "Active Projects",
    value: "4",
    meta: "₦8.2M budget",
    color: "yellow",
    icon: "folder",
  },
];

const upcomingEvents = [
  {
    title: "Sunday Worship Service",
    date: "Mar 9, 2026 - 9:00 AM",
    tag: "342 expected",
  },
  {
    title: "Youth Fellowship",
    date: "Mar 11, 2026 - 5:00 PM",
    tag: "89 expected",
  },
  {
    title: "Bible Study",
    date: "Mar 12, 2026 - 6:30 PM",
    tag: "120 expected",
  },
  {
    title: "Prayer Meeting",
    date: "Mar 13, 2026 - 6:00 AM",
    tag: "85 expected",
  },
];

const offertory = [
  { title: "Sunday Service", date: "Mar 2, 2026", amount: "₦485,000" },
  { title: "Sunday Service", date: "Feb 23, 2026", amount: "₦520,000" },
  { title: "Special Offering", date: "Feb 16, 2026", amount: "₦750,000" },
  { title: "Sunday Service", date: "Feb 9, 2026", amount: "₦445,000" },
];

function StatIcon({ name }: { name: string }) {
  if (name === "users") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="9" cy="9" r="3" />
        <circle cx="17" cy="9" r="3" />
        <path d="M3.5 19c.6-2.8 3-4.5 6.5-4.5" />
        <path d="M20.5 19c-.6-2.8-3-4.5-6.5-4.5" />
      </svg>
    );
  }
  if (name === "cash") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 7h18v10H3z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 9h18" />
      </svg>
    );
  }
  if (name === "folder") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h7l2 2h9v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z" />
      </svg>
    );
  }

  return null;
}

export default function DashboardPage() {
  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Dashboard</h1>
          <p className="gp-page-subtitle">
            Welcome back! Here's what's happening at Labone Church of Christ.
          </p>
        </div>
      </div>

      <section className="gp-stats">
        {stats.map((stat) => (
          <div key={stat.label} className="gp-stat-card">
            <div>
              <p className="gp-stat-label">{stat.label}</p>
              <p className="gp-stat-value">{stat.value}</p>
              <p className="gp-stat-meta">{stat.meta}</p>
            </div>
            <div className={`gp-stat-icon ${stat.color}`}>
              <StatIcon name={stat.icon} />
            </div>
          </div>
        ))}
      </section>

      <section className="gp-panels">
        <div className="gp-card">
          <div className="gp-panel-header">
            <p className="gp-panel-title">Upcoming Events</p>
            <span className="gp-panel-link">View all</span>
          </div>
          <div className="gp-event-list">
            {upcomingEvents.map((event) => (
              <div key={event.title} className="gp-event-item">
                <div className="gp-event-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="3" />
                    <path d="M8 3v4M16 3v4M3 9h18" />
                  </svg>
                </div>
                <div>
                  <p className="gp-event-title">{event.title}</p>
                  <p className="gp-event-meta">{event.date}</p>
                </div>
                <span className="gp-chip">{event.tag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="gp-card">
          <div className="gp-panel-header">
            <p className="gp-panel-title">Recent Offertory</p>
            <span className="gp-panel-link">View all</span>
          </div>
          <div className="gp-table-wrap">
            {offertory.map((item) => (
              <div key={item.date} className="gp-offertory-item">
                <div>
                  <p className="gp-event-title">{item.title}</p>
                  <p className="gp-event-meta">{item.date}</p>
                </div>
                <span className="gp-event-title">{item.amount}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gp-quick-actions">
        <div>
          <h4>Quick Actions</h4>
          <p>
            Record today's offertory, add a new member, or create an event.
          </p>
        </div>
        <div className="gp-quick-buttons">
          <button className="gp-quick-btn">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 7h18v10H3z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Record Offertory
          </button>
          <button className="gp-quick-btn secondary">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="7" r="3" />
              <path d="M5 21a7 7 0 0 1 14 0" />
            </svg>
            Add Member
          </button>
          <button className="gp-quick-btn ghost">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Event
          </button>
        </div>
      </section>
    </div>
  );
}
