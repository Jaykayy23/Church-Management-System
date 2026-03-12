import {
  getDashboardStats,
  getUpcomingEvents,
  getRecentOffertory,
  getSettings,
} from "@/lib/data";
import { formatCedis } from "@/lib/format";
import Link from "next/link";

export const dynamic = "force-dynamic";

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

export default async function DashboardPage() {
  const settings = await getSettings();
  const churchName =
    settings?.churchName ?? process.env.NEXT_PUBLIC_CHURCH_NAME ?? "Church";
  const [statsData, events, offertory] = await Promise.all([
    getDashboardStats(),
    getUpcomingEvents(4),
    getRecentOffertory(4),
  ]);

  const stats = [
    {
      label: "Total Members",
      value: statsData.totalMembers.toLocaleString(),
      meta: `${statsData.membersChangePct >= 0 ? "?" : "?"} ${Math.abs(
        statsData.membersChangePct
      ).toFixed(1)}%`,
      metaClass: statsData.membersChangePct >= 0 ? "" : "down",
      color: "blue",
      icon: "users",
      href: "/members",
    },
    {
      label: "This Month's Offertory",
      value: formatCedis(statsData.thisMonthOffertory),
      meta: `${statsData.offertoryChangePct >= 0 ? "?" : "?"} ${Math.abs(
        statsData.offertoryChangePct
      ).toFixed(1)}%`,
      metaClass: statsData.offertoryChangePct >= 0 ? "" : "down",
      color: "orange",
      icon: "cash",
      href: "/offertory",
    },
    {
      label: "Upcoming Events",
      value: statsData.upcomingEvents.toString(),
      meta: "This week",
      metaClass: "",
      color: "green",
      icon: "calendar",
      href: "/events",
    },
    {
      label: "Active Projects",
      value: statsData.activeProjects.toString(),
      meta: `${formatCedis(statsData.activeBudget)} budget`,
      metaClass: "",
      color: "yellow",
      icon: "folder",
      href: "/projects",
    },
  ];
  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Dashboard</h1>
          <p className="gp-page-subtitle">
            Welcome back! Here's what's happening at {churchName}.
          </p>
        </div>
      </div>

      <section className="gp-stats">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="gp-stat-card gp-stat-link"
          >
            <div>
              <p className="gp-stat-label">{stat.label}</p>
              <p className="gp-stat-value">{stat.value}</p>
              <p className={`gp-stat-meta ${stat.metaClass}`}>{stat.meta}</p>
            </div>
            <div className={`gp-stat-icon ${stat.color}`}>
              <StatIcon name={stat.icon} />
            </div>
          </Link>
        ))}
      </section>

      <section className="gp-panels">
        <div className="gp-card">
          <div className="gp-panel-header">
            <p className="gp-panel-title">Upcoming Events</p>
            <Link className="gp-panel-link" href="/events">
              View all
            </Link>
          </div>
          <div className="gp-event-list">
            {events.map((event) => (
              <div key={event.id} className="gp-event-item">
                <div className="gp-event-icon">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <rect x="3" y="5" width="18" height="16" rx="3" />
                    <path d="M8 3v4M16 3v4M3 9h18" />
                  </svg>
                </div>
                <div>
                  <p className="gp-event-title">{event.title}</p>
                  <p className="gp-event-meta">
                    {new Date(event.startAt).toLocaleString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <span className="gp-chip">{event.expectedCount} expected</span>
              </div>
            ))}
          </div>
        </div>
        <div className="gp-card">
          <div className="gp-panel-header">
            <p className="gp-panel-title">Recent Offertory</p>
            <Link className="gp-panel-link" href="/offertory">
              View all
            </Link>
          </div>
          <div className="gp-table-wrap">
            {offertory.map((item) => (
              <div key={item.id} className="gp-offertory-item">
                <div>
                  <p className="gp-event-title">{item.type}</p>
                  <p className="gp-event-meta">
                    {new Date(item.date).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <span className="gp-event-title">{formatCedis(item.amount)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="gp-quick-actions">
        <div>
          <h4>Quick Actions</h4>
          <p>Record today's offertory, add a new member, or create an event.</p>
        </div>
        <div className="gp-quick-buttons">
          <Link className="gp-quick-btn" href="/offertory/new">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M3 7h18v10H3z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Record Offertory
          </Link>
          <Link className="gp-quick-btn secondary" href="/members/new">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="12" cy="7" r="3" />
              <path d="M5 21a7 7 0 0 1 14 0" />
            </svg>
            Add Member
          </Link>
          <Link className="gp-quick-btn ghost" href="/events/new">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            New Event
          </Link>
        </div>
      </section>
    </div>
  );
}
