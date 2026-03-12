export default function Topbar() {
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
        <button className="gp-icon-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 3a5 5 0 0 0-5 5v3.6l-1.8 3A1 1 0 0 0 6 16h12a1 1 0 0 0 .8-1.6L17 11.6V8a5 5 0 0 0-5-5z" />
            <path d="M9.5 18a2.5 2.5 0 0 0 5 0" />
          </svg>
        </button>
        <div className="gp-avatar">PA</div>
      </div>
    </header>
  );
}
