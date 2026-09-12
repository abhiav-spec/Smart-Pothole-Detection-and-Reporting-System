import UserDashboard from "@/components/dashboard/UserDashboard";

export const metadata = {
  title: "Dashboard — PotholeAI Civic Intelligence",
  description: "Citizen operations center for reporting potholes and tracking road repairs.",
};

export default function DashboardPage() {
  return <UserDashboard />;
}
