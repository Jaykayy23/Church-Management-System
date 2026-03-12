"use client";

import { useEffect, useState } from "react";

const timezones = [
  "Africa/Accra",
  "Africa/Lagos",
  "Europe/London",
  "America/New_York",
];

const currencies = ["GHS", "NGN", "USD", "GBP"];

export default function SettingsForm() {
  const [churchName, setChurchName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [timezone, setTimezone] = useState("Africa/Accra");
  const [currency, setCurrency] = useState("GHS");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const settings = data.data;
        if (settings) {
          setChurchName(settings.churchName ?? "");
          setAddress(settings.address ?? "");
          setPhone(settings.phone ?? "");
          setEmail(settings.email ?? "");
          setTimezone(settings.timezone ?? "Africa/Accra");
          setCurrency(settings.currency ?? "GHS");
        }
      })
      .catch(() => setError("Unable to load settings."))
      .finally(() => setLoading(false));
  }, []);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setSuccess("");
    const response = await fetch("/api/settings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        churchName,
        address,
        phone,
        email,
        timezone,
        currency,
      }),
    });
    if (!response.ok) {
      setError("Failed to update settings.");
      return;
    }
    setSuccess("Settings saved.");
  }

  if (loading) {
    return <div className="gp-settings-card">Loading settings...</div>;
  }

  return (
    <form className="gp-form" onSubmit={handleSubmit}>
      <div className="gp-form-grid">
        <div className="gp-form-row">
          <label>Church Name</label>
          <input
            value={churchName}
            onChange={(event) => setChurchName(event.target.value)}
            required
          />
        </div>
        <div className="gp-form-row">
          <label>Address</label>
          <input
            value={address}
            onChange={(event) => setAddress(event.target.value)}
          />
        </div>
        <div className="gp-form-row">
          <label>Phone</label>
          <input value={phone} onChange={(event) => setPhone(event.target.value)} />
        </div>
        <div className="gp-form-row">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div className="gp-form-row">
          <label>Timezone</label>
          <select
            value={timezone}
            onChange={(event) => setTimezone(event.target.value)}
          >
            {timezones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>
        </div>
        <div className="gp-form-row">
          <label>Currency</label>
          <select
            value={currency}
            onChange={(event) => setCurrency(event.target.value)}
          >
            {currencies.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      </div>
      {error ? <p className="gp-login-error">{error}</p> : null}
      {success ? <p className="gp-login-success">{success}</p> : null}
      <div className="gp-form-actions">
        <button className="gp-action-btn" type="submit">
          Save Settings
        </button>
      </div>
    </form>
  );
}
