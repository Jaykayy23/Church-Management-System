"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewOffertoryPage() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [type, setType] = useState("Sunday Service");
  const [givers, setGivers] = useState(0);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    const response = await fetch("/api/offertory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        type,
        givers: Number(givers),
        amount: Number(amount),
      }),
    });
    if (!response.ok) {
      setError("Failed to record offertory.");
      return;
    }
    router.push("/offertory");
  }

  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Record Offertory</h1>
          <p className="gp-page-subtitle">Log a new offertory entry.</p>
        </div>
      </div>

      <form className="gp-form" onSubmit={handleSubmit}>
        <div className="gp-form-grid">
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
            <label>Type</label>
            <select value={type} onChange={(event) => setType(event.target.value)}>
              <option>Sunday Service</option>
              <option>Special Offering</option>
              <option>Thanksgiving</option>
            </select>
          </div>
          <div className="gp-form-row">
            <label>Number of Givers</label>
            <input
              type="number"
              value={givers}
              onChange={(event) => setGivers(Number(event.target.value))}
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
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
}
