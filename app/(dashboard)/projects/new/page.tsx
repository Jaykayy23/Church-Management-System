"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewProjectPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [raisedAmount, setRaisedAmount] = useState(0);
  const [goalAmount, setGoalAmount] = useState(0);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/projects", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        status,
        raisedAmount: Number(raisedAmount),
        goalAmount: Number(goalAmount),
      }),
    });
    if (!response.ok) {
      setError("Failed to create project.");
      return;
    }
    router.push("/projects");
  }

  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">New Project</h1>
          <p className="gp-page-subtitle">Start tracking a new project.</p>
        </div>
      </div>

      <form className="gp-form" onSubmit={handleSubmit}>
        <div className="gp-form-grid">
          <div className="gp-form-row">
            <label>Project Title</label>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Status</label>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              <option>Active</option>
              <option>Completed</option>
              <option>Planning</option>
            </select>
          </div>
          <div className="gp-form-row">
            <label>Raised Amount</label>
            <input
              type="number"
              value={raisedAmount}
              onChange={(event) => setRaisedAmount(Number(event.target.value))}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Goal Amount</label>
            <input
              type="number"
              value={goalAmount}
              onChange={(event) => setGoalAmount(Number(event.target.value))}
              required
            />
          </div>
        </div>
        {error ? <p className="gp-login-error">{error}</p> : null}
        <div className="gp-form-actions">
          <button className="gp-action-btn" type="submit">
            Create Project
          </button>
        </div>
      </form>
    </div>
  );
}
