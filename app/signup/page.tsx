import { redirect } from "next/navigation";
import { requireRole } from "@/lib/server-auth";
import SignupForm from "./SignupForm";

export default async function SignupPage() {
  const auth = await requireRole("admin");
  if (!auth.ok) {
    redirect("/");
  }
  const churchName = process.env.NEXT_PUBLIC_CHURCH_NAME ?? "Church";

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
          Create account
        </h1>
        <p className="gp-page-subtitle" style={{ marginBottom: "20px" }}>
          Admin-only user creation.
        </p>
        <SignupForm />
      </div>
    </div>
  );
}
