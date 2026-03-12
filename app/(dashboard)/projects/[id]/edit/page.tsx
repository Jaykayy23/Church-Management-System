"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Active");
  const [raisedAmount, setRaisedAmount] = useState("");
  const [goalAmount, setGoalAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!projectId) return;
    fetch(`/api/projects/${projectId}`)
      .then((res) => res.json())
      .then((data) => {
        const project = data.data;
        if (project) {
          setTitle(project.title ?? "");
          setStatus(project.status ?? "Active");
          setRaisedAmount(project.raisedAmount?.toString() ?? "");
          setGoalAmount(project.goalAmount?.toString() ?? "");
        }
      })
      .catch(() => setError("Unable to load project."));
  }, [projectId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!projectId) {
      setError("Missing project id.");
      return;
    }
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        status,
        raisedAmount: Number(raisedAmount || 0),
        goalAmount: Number(goalAmount || 0),
      }),
    });
    if (!response.ok) {
      setError("Failed to update project.");
      return;
    }
    router.push("/projects");
  }

  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Edit Project</h1>
          <p className="gp-page-subtitle">Update project details and budget.</p>
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
              onChange={(event) => setRaisedAmount(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Goal Amount</label>
            <input
              type="number"
              value={goalAmount}
              onChange={(event) => setGoalAmount(event.target.value)}
              required
            />
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
