"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ContributionActions({ contributionId }: { contributionId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Delete this contribution?");
    if (!ok) return;
    const response = await fetch(`/api/contributions/${contributionId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="gp-row-actions">
      <Link
        className="gp-muted-btn gp-action-compact"
        href={`/contributions/${contributionId}/edit`}
      >
        Edit
      </Link>
      <button
        className="gp-muted-btn gp-action-compact danger"
        type="button"
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );
}
