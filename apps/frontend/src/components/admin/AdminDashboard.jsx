"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import AdminKPISection from "./AdminKPISection";
import StatusBreakdownCard from "./StatusBreakdownCard";
import SeverityOverviewCard from "./SeverityOverviewCard";
import AdminReportsTable from "./AdminReportsTable";
import ReportPreviewModal from "./ReportPreviewModal";
import AdminLogoutModal from "./AdminLogoutModal";

export default function AdminDashboard() {
  const router = useRouter();
  const [selectedReport, setSelectedReport] = useState(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <div className="bg-background font-body-md text-on-surface antialiased min-h-screen">
      {/* Fixed Left Navigation Sidebar */}
      <AdminSidebar onOpenLogout={() => setIsLogoutOpen(true)} />

      {/* Main Content Area */}
      <div className="pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <AdminHeader onOpenLogout={() => setIsLogoutOpen(true)} />

        {/* Main Telemetry & Operations Container */}
        <main className="w-full pt-16 flex-1 bg-background">
          <div className="flex flex-col w-full">
            <div className="px-space-md sm:px-space-lg lg:px-margin py-space-lg max-w-[1440px] mx-auto w-full flex flex-col gap-space-xl">
              {/* Header Section */}
              <header className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold bg-primary-container/20 px-2.5 py-0.5 rounded-full">
                      Telemetry Grid Active
                    </span>
                    <span className="text-secondary font-label-sm text-label-sm">
                      • Zone 04 Municipal DPW
                    </span>
                  </div>
                  <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
                    Road Safety Overview
                  </h1>
                  <p className="font-body-md text-body-md text-secondary max-w-2xl">
                    Monitor reported potholes and road issues across the reporting network.
                  </p>
                </div>
                <div className="flex items-center gap-space-sm shrink-0">
                  <button
                    type="button"
                    onClick={() => router.push("/dashboard/map")}
                    className="h-11 px-space-md rounded-lg bg-surface-container-low text-on-surface hover:bg-surface-container-high transition-colors font-title-md text-title-md flex items-center gap-2 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px] text-primary">pin_drop</span>
                    <span>Open Map</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push("/dashboard/reports")}
                    className="h-11 px-space-md rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors font-title-md text-title-md flex items-center gap-2 shadow-md"
                  >
                    <span>View All Reports</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </header>

              {/* 1. Four Statistics KPI Cards */}
              <AdminKPISection />

              {/* 2. Mid Section - Two Analytical Breakdown Cards */}
              <section className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg">
                <StatusBreakdownCard />
                <SeverityOverviewCard />
              </section>

              {/* 3. Recent Reports Section */}
              <AdminReportsTable onOpenReportModal={(report) => setSelectedReport(report)} />

              {/* Contextual Map Quickview Banner */}
              <section className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col md:flex-row items-center justify-between gap-space-md">
                <div className="flex items-center gap-space-md">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <span className="material-symbols-outlined text-[28px]">explore</span>
                  </div>
                  <div className="flex flex-col">
                    <h3 className="font-headline-sm text-headline-sm text-on-surface">
                      Real-Time Heatmap Coverage
                    </h3>
                    <p className="font-body-sm text-body-sm text-secondary">
                      View live spatial density clusters across all 8 civic wards with route-repair optimization.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/dashboard/map")}
                  className="shrink-0 h-11 px-space-lg rounded-lg bg-inverse-surface text-inverse-on-surface hover:bg-on-surface font-title-md text-title-md flex items-center gap-2 shadow-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">map</span>
                  <span>Launch Interactive Map</span>
                </button>
              </section>
            </div>
          </div>
        </main>
      </div>

      {/* Interactive Quick Preview Modal */}
      <ReportPreviewModal report={selectedReport} onClose={() => setSelectedReport(null)} />

      {/* Sign Out Confirmation Modal */}
      <AdminLogoutModal isOpen={isLogoutOpen} onClose={() => setIsLogoutOpen(false)} />
    </div>
  );
}
