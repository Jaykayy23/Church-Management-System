"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const churchName = process.env.NEXT_PUBLIC_CHURCH_NAME ?? "Church";
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    setLoading(false);
    if (!response.ok) {
      setError("Invalid username or password.");
      return;
    }
    router.push("/");
  }

  return (
    <div className="gp-login">
      <div className="gp-login-card">
        <div className="gp-brand" style={{ marginBottom: "18px" }}>
          <div className="gp-logo">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 10c0-4.4 3.6-8 8-8s8 3.6 8 8v8H4v-8z" />
              <path d="M9 18V8h6v10" />
            </svg>
          </div>
          <div>
            <p className="gp-brand-name">{churchName}</p>
            <p className="gp-brand-sub">Admin Portal</p>
          </div>
        </div>
        <h1 className="gp-page-title" style={{ marginBottom: "8px" }}>
          Sign in
        </h1>
        <p className="gp-page-subtitle" style={{ marginBottom: "20px" }}>
          Use your staff credentials to continue.
        </p>
        <form onSubmit={handleSubmit} className="gp-login-form">
          <label>
            Username
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>
          {error ? <p className="gp-login-error">{error}</p> : null}
          <button className="gp-action-btn" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
