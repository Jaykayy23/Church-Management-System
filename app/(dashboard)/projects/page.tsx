import { getProjects } from "@/lib/data";
import { formatCedis } from "@/lib/format";
import Link from "next/link";
import ProjectActions from "./ProjectActions";

export const dynamic = "force-dynamic";

const chipMap: Record<string, string> = {
  Active: "green",
  Completed: "orange",
  Planning: "blue",
};

export default async function ProjectsPage() {
  const projects = await getProjects();
  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Projects</h1>
          <p className="gp-page-subtitle">
            Track church projects and fundraising progress.
          </p>
        </div>
        <Link className="gp-action-btn" href="/projects/new">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
          New Project
        </Link>
      </div>

      <div className="gp-card">
        {projects.map((project) => {
          const raised = Number(project.raisedAmount);
          const goal = Number(project.goalAmount);
          const percent = goal ? Math.round((raised / goal) * 100) : 0;
          return (
          <div key={project.id} className="gp-project-item">
            <div className="gp-event-icon">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M3 6h7l2 2h9v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z" />
              </svg>
            </div>
            <div>
              <p className="gp-event-title">
                {project.title}{" "}
                <span className={`gp-chip ${chipMap[project.status] ?? "green"}`}>
                  {project.status}
                </span>
              </p>
              <p className="gp-event-meta">
                {formatCedis(raised)} raised
              </p>
              <div className="gp-project-progress">
                <span style={{ width: `${percent}%` }} />
              </div>
            </div>
            <div className="gp-project-right">
              {percent}%
              <small>{formatCedis(goal)} goal</small>
              <small>funded</small>
              <ProjectActions projectId={project.id} />
            </div>
          </div>
        )})}
      </div>
    </div>
  );
}
