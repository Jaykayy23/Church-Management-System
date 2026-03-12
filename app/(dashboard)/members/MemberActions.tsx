"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MemberActions({ memberId }: { memberId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Delete this member?");
    if (!ok) return;
    const response = await fetch(`/api/members/${memberId}`, { method: "DELETE" });
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="gp-member-actions">
      <Link className="gp-muted-btn gp-action-compact" href={`/members/${memberId}/edit`}>
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
