"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Dashboard", href: "/", icon: "grid" },
  { label: "Events", href: "/events", icon: "calendar" },
  { label: "Offertory", href: "/offertory", icon: "dollar" },
  { label: "Projects", href: "/projects", icon: "folder" },
  { label: "Contributions", href: "/contributions", icon: "heart" },
  { label: "Members", href: "/members", icon: "users" },
];

const systemItems = [{ label: "Settings", href: "/settings", icon: "settings" }];

function Icon({ name }: { name: string }) {
  if (name === "grid") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="7" height="7" rx="2" />
        <rect x="14" y="3" width="7" height="7" rx="2" />
        <rect x="3" y="14" width="7" height="7" rx="2" />
        <rect x="14" y="14" width="7" height="7" rx="2" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="3" />
        <path d="M8 3v4M16 3v4M3 9h18" />
      </svg>
    );
  }
  if (name === "dollar") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3v18" />
        <path d="M16 7.5c0-1.9-1.8-3.5-4-3.5s-4 1.3-4 3.2c0 2 2 2.9 4 3.3 2 .4 4 1.3 4 3.4s-1.8 3.6-4 3.6-4-1.4-4-3.4" />
      </svg>
    );
  }
  if (name === "folder") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 6h7l2 2h9v10a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6z" />
      </svg>
    );
  }
  if (name === "heart") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 20s-7-4.5-7-9a4 4 0 0 1 7-2.3A4 4 0 0 1 19 11c0 4.5-7 9-7 9z" />
      </svg>
    );
  }
  if (name === "users") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="8" cy="9" r="3" />
        <circle cx="17" cy="9" r="3" />
        <path d="M3.5 19c.6-2.8 3-4.5 6.5-4.5" />
        <path d="M20.5 19c-.6-2.8-3-4.5-6.5-4.5" />
      </svg>
    );
  }
  if (name === "settings") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M19 12a7 7 0 0 0-.1-1.2l2.1-1.6-2-3.5-2.5 1a7.7 7.7 0 0 0-2.1-1.2l-.3-2.6h-4l-.3 2.6a7.7 7.7 0 0 0-2.1 1.2l-2.5-1-2 3.5 2.1 1.6A7 7 0 0 0 5 12c0 .4 0 .8.1 1.2l-2.1 1.6 2 3.5 2.5-1a7.7 7.7 0 0 0 2.1 1.2l.3 2.6h4l.3-2.6a7.7 7.7 0 0 0 2.1-1.2l2.5 1 2-3.5-2.1-1.6c.1-.4.1-.8.1-1.2z" />
      </svg>
    );
  }

  return null;
}

function SidebarSection({
  title,
  items,
  pathname,
}: {
  title: string;
  items: typeof navItems;
  pathname: string;
}) {
  return (
    <div className="gp-nav-section">
      <p className="gp-nav-title">{title}</p>
      <div className="gp-nav-links">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`gp-nav-link${active ? " active" : ""}`}
            >
              <span className="gp-nav-icon">
                <Icon name={item.icon} />
              </span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const fallbackName = process.env.NEXT_PUBLIC_CHURCH_NAME ?? "Church";
  const [churchName, setChurchName] = useState(fallbackName);
  const [nextEvent, setNextEvent] = useState<{ title: string; time: string }>({
    title: "Upcoming Event",
    time: "No scheduled time",
  });

  useEffect(() => {
    fetch("/api/settings")
      .then((res) => res.json())
      .then((data) => {
        const settings = data.data;
        if (settings?.churchName) {
          setChurchName(settings.churchName);
        }
      })
      .catch(() => null);
    fetch("/api/events")
      .then((res) => res.json())
      .then((data) => {
        const first = data.data?.[0];
        if (first) {
          const time = new Date(first.startAt).toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
          });
          setNextEvent({ title: first.title, time });
        }
      })
      .catch(() => null);
  }, []);

  return (
    <aside className="gp-sidebar">
      <div className="gp-brand">
        <div className="gp-logo">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M4 10c0-4.4 3.6-8 8-8s8 3.6 8 8v8H4v-8z" />
            <path d="M9 18V8h6v10" />
          </svg>
        </div>
        <div>
          <p className="gp-brand-name">{churchName}</p>
          <p className="gp-brand-sub">Church Management</p>
        </div>
      </div>

      <SidebarSection title="Main Menu" items={navItems} pathname={pathname} />
      <SidebarSection title="System" items={systemItems} pathname={pathname} />

      <div className="gp-upcoming">
        <p className="gp-upcoming-title">{nextEvent.title}</p>
        <p className="gp-upcoming-time">{nextEvent.time}</p>
      </div>
    </aside>
  );
}
