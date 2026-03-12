"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function toDateTimeLocal(value?: string | Date | null) {
  if (!value) return "";
  const date = new Date(value);
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export default function EditEventPage() {
  const router = useRouter();
  const params = useParams();
  const eventId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [title, setTitle] = useState("");
  const [startAt, setStartAt] = useState("");
  const [location, setLocation] = useState("");
  const [expectedCount, setExpectedCount] = useState("");
  const [category, setCategory] = useState("Worship");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;
    fetch(`/api/events/${eventId}`)
      .then((res) => res.json())
      .then((data) => {
        const event = data.data;
        if (event) {
          setTitle(event.title ?? "");
          setStartAt(toDateTimeLocal(event.startAt));
          setLocation(event.location ?? "");
          setExpectedCount(event.expectedCount?.toString() ?? "");
          setCategory(event.category ?? "Worship");
        }
      })
      .catch(() => setError("Unable to load event."));
  }, [eventId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!eventId) {
      setError("Missing event id.");
      return;
    }
    const response = await fetch(`/api/events/${eventId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        startAt,
        location,
        expectedCount: Number(expectedCount || 0),
        category,
      }),
    });
    if (!response.ok) {
      setError("Failed to update event.");
      return;
    }
    router.push("/events");
  }

  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Edit Event</h1>
          <p className="gp-page-subtitle">Update event details.</p>
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
              onChange={(event) => setExpectedCount(event.target.value)}
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
