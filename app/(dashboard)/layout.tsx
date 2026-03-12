import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="gp-app">
      <Sidebar />
      <div className="gp-main">
        <Topbar />
        <div className="gp-content">{children}</div>
      </div>
    </div>
  );
}
