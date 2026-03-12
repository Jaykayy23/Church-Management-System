"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function toDateInput(value?: string | Date | null) {
  if (!value) return "";
  const date = new Date(value);
  const pad = (num: number) => String(num).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
}

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("Member");
  const [team, setTeam] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [joinedAt, setJoinedAt] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!memberId) return;
    fetch(`/api/members/${memberId}`)
      .then((res) => res.json())
      .then((data) => {
        const member = data.data;
        if (member) {
          setFirstName(member.firstName ?? "");
          setLastName(member.lastName ?? "");
          setRole(member.role ?? "Member");
          setTeam(member.team ?? "");
          setPhone(member.phone ?? "");
          setEmail(member.email ?? "");
          setJoinedAt(toDateInput(member.joinedAt));
        }
      })
      .catch(() => setError("Unable to load member."));
  }, [memberId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!memberId) {
      setError("Missing member id.");
      return;
    }
    const response = await fetch(`/api/members/${memberId}`, {
      method: "PATCH",
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
      setError("Failed to update member.");
      return;
    }
    router.push("/members");
  }

  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Edit Member</h1>
          <p className="gp-page-subtitle">Update member information.</p>
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
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
