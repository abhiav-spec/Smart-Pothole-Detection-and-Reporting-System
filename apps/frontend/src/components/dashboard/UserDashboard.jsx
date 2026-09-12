"use client";

import { useState, useEffect } from "react";
import DashboardHeader from "./DashboardHeader";
import WelcomeBanner from "./WelcomeBanner";
import QuickActions from "./QuickActions";
import RecentReports from "./RecentReports";
import HazardAlertBanner from "./HazardAlertBanner";
import DashboardFooter from "./DashboardFooter";
import LogoutModal from "./LogoutModal";

export default function UserDashboard() {
  const [user, setUser] = useState(null);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);

  useEffect(() => {
    // Load authenticated user from localStorage if present
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error("Failed to parse user session", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <div className="flex flex-col min-h-screen bg-background antialiased">
      <DashboardHeader
        user={user}
        onLogoutClick={() => setLogoutModalOpen(true)}
      />

      <main className="w-full pt-16 bg-background flex-1">
        <div className="flex flex-col w-full">
          <div className="max-w-[1440px] w-full mx-auto px-gutter py-space-lg flex flex-col gap-space-xl">
            {/* Welcome Banner */}
            <WelcomeBanner user={user} />

            {/* Quick Actions Operations Center */}
            <QuickActions onLogoutClick={() => setLogoutModalOpen(true)} />

            {/* Recent Citizen Reports */}
            <RecentReports />

            {/* Nearby Road Hazard Alerts */}
            <HazardAlertBanner />
          </div>
        </div>
      </main>

      <DashboardFooter />

      {/* Logout Confirmation Modal */}
      <LogoutModal
        isOpen={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}
