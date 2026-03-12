"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewEventPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [startAt, setStartAt] = useState("");
  const [location, setLocation] = useState("");
  const [expectedCount, setExpectedCount] = useState(0);
  const [category, setCategory] = useState("Worship");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        startAt,
        location,
        expectedCount: Number(expectedCount),
        category,
      }),
    });
    if (!response.ok) {
      setError("Failed to create event.");
      return;
    }
    router.push("/events");
  }

  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Create Event</h1>
          <p className="gp-page-subtitle">Add a new church event.</p>
        </div>
      </div>

      <form className="gp-form" onSubmit={handleSubmit}>
        <div className="gp-form-grid">
          <div className="gp-form-row">
            <label>Event Title</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Date & Time</label>
            <input
              type="datetime-local"
              value={startAt}
              onChange={(event) => setStartAt(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Location</label>
            <input
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Expected Attendance</label>
            <input
              type="number"
              value={expectedCount}
              onChange={(event) => setExpectedCount(Number(event.target.value))}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Category</label>
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
            >
              <option>Worship</option>
              <option>Fellowship</option>
              <option>Study</option>
              <option>Prayer</option>
              <option>Conference</option>
              <option>Education</option>
            </select>
          </div>
        </div>
        {error ? <p className="gp-login-error">{error}</p> : null}
        <div className="gp-form-actions">
          <button className="gp-action-btn" type="submit">
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
