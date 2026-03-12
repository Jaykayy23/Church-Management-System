import { getEvents } from "@/lib/data";
import Link from "next/link";

const chipMap: Record<string, string> = {
  Worship: "orange",
  Fellowship: "blue",
  Study: "green",
  Prayer: "orange",
  Conference: "purple",
  Education: "gray",
};

export const dynamic = "force-dynamic";

export default async function EventsPage() {
  const events = await getEvents();
  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Events</h1>
          <p className="gp-page-subtitle">
            Manage and track church events and activities.
          </p>
        </div>
        <Link className="gp-action-btn" href="/events/new">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create Event
        </Link>
      </div>

      <div className="gp-search" style={{ marginBottom: "16px" }}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input placeholder="Search events..." />
      </div>

      <div className="gp-card">
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
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 8v5l3 2" />
                  </svg>
                  {new Date(event.startAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </span>
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 21s7-6.2 7-11a7 7 0 0 0-14 0c0 4.8 7 11 7 11z" />
                    <circle cx="12" cy="10" r="2.5" />
                  </svg>
                  {event.location}
                </span>
                <span>
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <circle cx="9" cy="9" r="3" />
                    <circle cx="17" cy="9" r="3" />
                    <path d="M3.5 19c.6-2.8 3-4.5 6.5-4.5" />
                    <path d="M20.5 19c-.6-2.8-3-4.5-6.5-4.5" />
                  </svg>
                  {event.expectedCount} expected
                </span>
              </p>
            </div>
            <span className={`gp-chip ${chipMap[event.category] ?? "orange"}`}>
              {event.category}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
