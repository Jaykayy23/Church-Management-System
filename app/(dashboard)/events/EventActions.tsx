"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function EventActions({ eventId }: { eventId: string }) {
  const router = useRouter();

  async function handleDelete() {
    const ok = confirm("Delete this event?");
    if (!ok) return;
    const response = await fetch(`/api/events/${eventId}`, { method: "DELETE" });
    if (response.ok) {
      router.refresh();
    }
  }

  return (
    <div className="gp-event-actions">
      <Link className="gp-muted-btn gp-action-compact" href={`/events/${eventId}/edit`}>
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
