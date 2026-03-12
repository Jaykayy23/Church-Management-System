"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

type NotificationItem = {
  id: string;
  title: string;
  detail: string;
  href: string;
  kind: "event" | "member" | "offertory";
};

export default function Topbar() {
  const router = useRouter();
  const [initials, setInitials] = useState("AC");
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => {
        const name = data.user?.name ?? data.user?.username ?? "";
        if (name) {
          const parts = name.split(" ");
          const first = parts[0]?.[0] ?? "";
          const last = parts[1]?.[0] ?? parts[0]?.[1] ?? "";
          const next = `${first}${last}`.toUpperCase();
          if (next.length >= 1) {
            setInitials(next);
          }
        }
      })
      .catch(() => null);
  }, []);

  useEffect(() => {
    fetch("/api/notifications")
      .then((res) => res.json())
      .then((data) => setNotifications(data.data ?? []))
      .catch(() => setNotifications([]));
  }, []);

  useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (!panelRef.current) return;
      if (panelRef.current.contains(event.target as Node)) return;
      setOpen(false);
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    if (open) {
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  return (
    <header className="gp-topbar">
      <button className="gp-square-btn" aria-label="Toggle menu">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="4" y="4" width="7" height="7" rx="2" />
          <rect x="13" y="4" width="7" height="7" rx="2" />
          <rect x="4" y="13" width="7" height="7" rx="2" />
          <rect x="13" y="13" width="7" height="7" rx="2" />
        </svg>
      </button>
      <div className="gp-topbar-right">
        <div className={`gp-notification${open ? " open" : ""}`} ref={panelRef}>
          <button
            className="gp-icon-btn gp-notification-btn"
            aria-label="Notifications"
            onClick={() => setOpen((prev) => !prev)}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12 3a5 5 0 0 0-5 5v3.6l-1.8 3A1 1 0 0 0 6 16h12a1 1 0 0 0 .8-1.6L17 11.6V8a5 5 0 0 0-5-5z" />
              <path d="M9.5 18a2.5 2.5 0 0 0 5 0" />
            </svg>
            {notifications.length ? (
              <span className="gp-notification-badge">
                {notifications.length}
              </span>
            ) : null}
          </button>
          {open ? (
            <div className="gp-notification-panel" role="dialog">
              <div className="gp-notification-header">
                <p>Notifications</p>
                <span>{notifications.length}</span>
              </div>
              <div className="gp-notification-list">
                {notifications.length ? (
                  notifications.map((item) => (
                    <Link
                      key={item.id}
                      href={item.href}
                      className="gp-notification-item"
                      onClick={() => setOpen(false)}
                    >
                      <div className={`gp-notification-dot ${item.kind}`} />
                      <div>
                        <p>{item.title}</p>
                        <span>{item.detail}</span>
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="gp-notification-empty">
                    You're all caught up.
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>
        <button className="gp-avatar" onClick={handleLogout} title="Sign out">
          {initials}
        </button>
      </div>
    </header>
  );
}
