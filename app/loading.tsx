export default function RootLoading() {
  return (
    <div className="gp-loader-page">
      <div className="gp-loader-card">
        <div className="gp-loader-logo" aria-hidden="true">
          <svg viewBox="0 0 24 24">
            <path d="M4 10a8 8 0 0 1 16 0" />
            <path d="M6 10a6 6 0 0 1 12 0" />
            <path d="M8 10a4 4 0 0 1 8 0" />
            <circle cx="12" cy="13" r="2" />
          </svg>
        </div>
        <div>
          <p className="gp-loader-title">Loading</p>
          <p className="gp-loader-subtitle">Getting things ready.</p>
        </div>
        <div className="gp-loader-dots" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      </div>
    </div>
  );
}
