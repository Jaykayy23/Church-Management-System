"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OffertoryActions({ recordId }: { recordId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Delete this offertory entry?");
    if (!ok) return;
    const response = await fetch(`/api/offertory/${recordId}`, { method: "DELETE" });
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="gp-row-actions">
      <Link
        className="gp-muted-btn gp-action-compact"
        href={`/offertory/${recordId}/edit`}
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
