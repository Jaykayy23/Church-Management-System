import SettingsForm from "./SettingsForm";

export const dynamic = "force-dynamic";

export default function SettingsPage() {
  return (
    <div>
      <div className="gp-page-header">
        <div>
          <h1 className="gp-page-title">Settings</h1>
          <p className="gp-page-subtitle">
            Manage your church system preferences.
          </p>
        </div>
      </div>

      <div className="gp-settings-card">
        <h4>Church Profile</h4>
        <p>Update the core details used across the dashboard.</p>
      </div>
      <SettingsForm />
    </div>
  );
}
