"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"staff" | "admin">("staff");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const response = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, username, password, role }),
    });
    setLoading(false);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? "Unable to create account.");
      return;
    }
    router.push("/");
  }

  return (
    <form onSubmit={handleSubmit} className="gp-login-form">
      <label>
        Full Name
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />
      </label>
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
      <label>
        Role
        <select value={role} onChange={(event) => setRole(event.target.value as "staff" | "admin")}>
          <option value="staff">Staff</option>
          <option value="admin">Admin</option>
        </select>
      </label>
      {error ? <p className="gp-login-error">{error}</p> : null}
      <button className="gp-action-btn" type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create account"}
      </button>
      <button
        className="gp-muted-btn"
        type="button"
        onClick={() => router.push("/")}
      >
        Cancel
      </button>
    </form>
  );
}
