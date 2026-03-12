"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProjectActions({ projectId }: { projectId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Delete this project?");
    if (!ok) return;
    const response = await fetch(`/api/projects/${projectId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="gp-project-actions">
      <Link className="gp-muted-btn" href={`/projects/${projectId}/edit`}>
        Edit
      </Link>
      <button className="gp-muted-btn" type="button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
}
