const events = [
  {
    title: "Sunday Worship Service",
    date: "Mar 9, 2026 - 9:00 AM",
    location: "Main Sanctuary",
    expected: "342 expected",
    tag: "Worship",
    chip: "orange",
  },
  {
    title: "Youth Fellowship",
    date: "Mar 11, 2026 - 5:00 PM",
    location: "Youth Hall",
    expected: "89 expected",
    tag: "Fellowship",
    chip: "blue",
  },
  {
    title: "Bible Study - Book of Romans",
    date: "Mar 12, 2026 - 6:30 PM",
    location: "Room 201",
    expected: "120 expected",
    tag: "Study",
    chip: "green",
  },
  {
    title: "Prayer Meeting",
    date: "Mar 13, 2026 - 6:00 AM",
    location: "Chapel",
    expected: "85 expected",
    tag: "Prayer",
    chip: "orange",
  },
  {
    title: "Women's Conference",
    date: "Mar 15, 2026 - 10:00 AM",
    location: "Main Sanctuary",
    expected: "250 expected",
    tag: "Conference",
    chip: "purple",
  },
  {
    title: "Children's Sunday School",
    date: "Mar 16, 2026 - 9:00 AM",
    location: "Children's Wing",
    expected: "78 expected",
    tag: "Education",
    chip: "gray",
  },
];

export default function EventsPage() {
  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Events</h1>
          <p className="gp-page-subtitle">
            Manage and track church events and activities.
          </p>
        </div>
        <button className="gp-action-btn">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Create Event
        </button>
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
          <div key={event.title} className="gp-event-item">
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
                  {event.date}
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
                  {event.expected}
                </span>
              </p>
            </div>
            <span className={`gp-chip ${event.chip}`}>{event.tag}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
