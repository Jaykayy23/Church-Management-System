const projects = [
  {
    title: "New Church Building",
    status: "Active",
    raised: "₦32,500,000 raised",
    goal: "₦45,000,000 goal",
    percent: 72,
    chip: "green",
  },
  {
    title: "Youth Center Renovation",
    status: "Active",
    raised: "₦5,200,000 raised",
    goal: "₦8,000,000 goal",
    percent: 65,
    chip: "green",
  },
  {
    title: "Community Outreach Program",
    status: "Completed",
    raised: "₦2,500,000 raised",
    goal: "₦2,500,000 goal",
    percent: 100,
    chip: "orange",
  },
  {
    title: "Sound System Upgrade",
    status: "Active",
    raised: "₦1,800,000 raised",
    goal: "₦3,200,000 goal",
    percent: 56,
    chip: "green",
  },
  {
    title: "Children's Wing Extension",
    status: "Planning",
    raised: "₦3,800,000 raised",
    goal: "₦12,000,000 goal",
    percent: 30,
    chip: "blue",
  },
];

export default function ProjectsPage() {
  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Projects</h1>
          <p className="gp-page-subtitle">
            Track church projects and fundraising progress.
          </p>
        </div>
        <button className="gp-action-btn">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Project
        </button>
      </div>

      <div className="gp-card">
        {projects.map((project) => (
          <div key={project.title} className="gp-project-item">
            <div className="gp-event-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 6h7l2 2h9v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z" />
              </svg>
            </div>
            <div>
              <p className="gp-event-title">
                {project.title}{" "}
                <span className={`gp-chip ${project.chip}`}>
                  {project.status}
                </span>
              </p>
              <p className="gp-event-meta">{project.raised}</p>
              <div className="gp-project-progress">
                <span style={{ width: `${project.percent}%` }} />
              </div>
            </div>
            <div className="gp-project-right">
              {project.percent}%
              <small>{project.goal}</small>
              <small>funded</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
