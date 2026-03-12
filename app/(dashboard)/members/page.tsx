import { getMembers } from "@/lib/data";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function MembersPage() {
  const members = await getMembers();
  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Members</h1>
          <p className="gp-page-subtitle">
            Manage church member records and information.
          </p>
        </div>
        <Link className="gp-action-btn" href="/members/new">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Member
        </Link>
      </div>

      <div className="gp-search" style={{ marginBottom: "16px" }}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input placeholder="Search members..." />
      </div>

      <div className="gp-grid">
        {members.map((member) => {
          const name = `${member.firstName} ${member.lastName}`;
          const initials = `${member.firstName[0] ?? ""}${member.lastName[0] ?? ""}`;
          return (
          <div key={member.id} className="gp-member-card">
            <div className="gp-member-head">
              <div className="gp-member-avatar">{initials}</div>
              <div>
                <p className="gp-member-title">{name}</p>
                <div className="gp-member-tags">
                  <span className="gp-chip">{member.role}</span>
                  <span className="gp-chip gray">{member.team}</span>
                </div>
              </div>
            </div>
            <div className="gp-member-info">
              <span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M6 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4c0 1-1 2-2 2A15 15 0 0 1 3 5c0-1 1-2 2-2z" />
                </svg>
                {member.phone}
              </span>
              <span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="14" rx="3" />
                  <path d="M3 7l9 6 9-6" />
                </svg>
                {member.email}
              </span>
              <span>
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <rect x="3" y="5" width="18" height="16" rx="3" />
                  <path d="M8 3v4M16 3v4M3 9h18" />
                </svg>
                {`Member since ${new Date(member.joinedAt).toLocaleDateString("en-US", {
                  month: "short",
                  year: "numeric",
                })}`}
              </span>
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}
