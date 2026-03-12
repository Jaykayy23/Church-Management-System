"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Member = {
  id: string;
  firstName: string;
  lastName: string;
};

export default function NewContributionPage() {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [memberId, setMemberId] = useState("");
  const [type, setType] = useState("Tithe");
  const [project, setProject] = useState("General Fund");
  const [date, setDate] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/members")
      .then((res) => res.json())
      .then((data) => {
        setMembers(data.data ?? []);
        if (data.data?.length) {
          setMemberId(data.data[0].id);
        }
      })
      .catch(() => setMembers([]));
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/contributions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId,
        type,
        project,
        date,
        amount: Number(amount),
      }),
    });
    if (!response.ok) {
      setError("Failed to record contribution.");
      return;
    }
    router.push("/contributions");
  }

  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Record Contribution</h1>
          <p className="gp-page-subtitle">
            Log a member contribution or donation.
          </p>
        </div>
      </div>

      <form className="gp-form" onSubmit={handleSubmit}>
        <div className="gp-form-grid">
          <div className="gp-form-row">
            <label>Member</label>
            <select
              value={memberId}
              onChange={(event) => setMemberId(event.target.value)}
              required
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.firstName} {member.lastName}
                </option>
              ))}
            </select>
          </div>
          <div className="gp-form-row">
            <label>Type</label>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option>Tithe</option>
              <option>Offering</option>
              <option>Donation</option>
              <option>Seed</option>
            </select>
          </div>
          <div className="gp-form-row">
            <label>Project</label>
            <input
              value={project}
              onChange={(event) => setProject(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Date</label>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(Number(event.target.value))}
              required
            />
          </div>
        </div>
        {error ? <p className="gp-login-error">{error}</p> : null}
        <div className="gp-form-actions">
          <button className="gp-action-btn" type="submit">
            Record Contribution
          </button>
        </div>
      </form>
    </div>
  );
}
