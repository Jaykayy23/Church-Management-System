const members = [
  {
    initials: "AJ",
    name: "Adebayo Johnson",
    role: "Deacon",
    team: "Ushering",
    phone: "+234 801 234 5678",
    email: "adebayo@email.com",
    since: "Member since Jan 2020",
  },
  {
    initials: "GO",
    name: "Grace Okonkwo",
    role: "Member",
    team: "Choir",
    phone: "+234 802 346 6789",
    email: "grace@email.com",
    since: "Member since Mar 2019",
  },
  {
    initials: "EE",
    name: "Emmanuel Eze",
    role: "Elder",
    team: "Finance",
    phone: "+234 803 456 7890",
    email: "emmanuel@email.com",
    since: "Member since Jan 2015",
  },
  {
    initials: "BN",
    name: "Blessing Nwachukwu",
    role: "Member",
    team: "Children's Ministry",
    phone: "+234 804 567 8901",
    email: "blessing@email.com",
    since: "Member since Sep 2021",
  },
  {
    initials: "SA",
    name: "Samuel Adeyemi",
    role: "Member",
    team: "Leadership",
    phone: "+234 805 678 9012",
    email: "samuel@email.com",
    since: "Member since Jan 2010",
  },
  {
    initials: "MO",
    name: "Mercy Okafor",
    role: "Member",
    team: "Media",
    phone: "+234 806 789 0123",
    email: "mercy@email.com",
    since: "Member since Feb 2022",
  },
];

export default function MembersPage() {
  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Members</h1>
          <p className="gp-page-subtitle">
            Manage church member records and information.
          </p>
        </div>
        <button className="gp-action-btn">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Add Member
        </button>
      </div>

      <div className="gp-search" style={{ marginBottom: "16px" }}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
        <input placeholder="Search members..." />
      </div>

      <div className="gp-grid">
        {members.map((member) => (
          <div key={member.name} className="gp-member-card">
            <div className="gp-member-head">
              <div className="gp-member-avatar">{member.initials}</div>
              <div>
                <p className="gp-member-title">{member.name}</p>
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
                {member.since}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
