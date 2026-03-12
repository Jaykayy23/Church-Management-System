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

export default function EditOffertoryPage() {
  const router = useRouter();
  const params = useParams();
  const recordId = Array.isArray(params.id) ? params.id[0] : params.id;
  const [date, setDate] = useState("");
  const [type, setType] = useState("Sunday Service");
  const [givers, setGivers] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!recordId) return;
    fetch(`/api/offertory/${recordId}`)
      .then((res) => res.json())
      .then((data) => {
        const record = data.data;
        if (record) {
          setDate(toDateInput(record.date));
          setType(record.type ?? "Sunday Service");
          setGivers(record.givers?.toString() ?? "");
          setAmount(record.amount?.toString() ?? "");
        }
      })
      .catch(() => setError("Unable to load offertory record."));
  }, [recordId]);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!recordId) {
      setError("Missing record id.");
      return;
    }
    const response = await fetch(`/api/offertory/${recordId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        date,
        type,
        givers: Number(givers || 0),
        amount: Number(amount || 0),
      }),
    });
    if (!response.ok) {
      setError("Failed to update offertory record.");
      return;
    }
    router.push("/offertory");
  }

  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Edit Offertory</h1>
          <p className="gp-page-subtitle">Update offertory entry.</p>
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
              onChange={(event) => setGivers(event.target.value)}
              required
            />
          </div>
          <div className="gp-form-row">
            <label>Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
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
