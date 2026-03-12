"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewMemberPage() {
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Member");
  const [team, setTeam] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/members", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        firstName,
        lastName,
        role,
        team,
        phone,
        email,
        joinedAt,
      }),
    });
    if (!response.ok) {
      setError("Failed to add member.");
      return;
    }
    router.push("/members");
  }

  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Add Member</h1>
          <p className="gp-page-subtitle">Create a new member profile.</p>
        </div>
      </div>

      <form className="gp-form" onSubmit={handleSubmit}>
        <div className="gp-form-grid">
          <div className="gp-form-row">
            <label>First Name</label>
            <input
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Last Name</label>
            <input
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Role</label>
            <select value={role} onChange={(event) => setRole(event.target.value)}>
              <option>Member</option>
              <option>Deacon</option>
              <option>Elder</option>
            </select>
          </div>
          <div className="gp-form-row">
            <label>Team</label>
            <input
              value={team}
              onChange={(event) => setTeam(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Phone</label>
            <input
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Joined Date</label>
            <input
              type="date"
              value={joinedAt}
              onChange={(event) => setJoinedAt(event.target.value)}
              required
            />
          </div>
        </div>
        {error ? <p className="gp-login-error">{error}</p> : null}
        <div className="gp-form-actions">
          <button className="gp-action-btn" type="submit">
            Save Member
          </button>
        </div>
      </form>
    </div>
  );
}
