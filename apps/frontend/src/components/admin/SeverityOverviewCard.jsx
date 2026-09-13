"use client";

import { useState } from "react";

export default function SeverityOverviewCard() {
  const [filter, setFilter] = useState("all");

  const handleDispatch = () => {
    alert("Dispatching Quick-Response Alpha Team to critical sector.");
  };

  return (
    <div className="lg:col-span-5 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Severity Overview</h2>
          <p className="font-body-sm text-body-sm text-secondary">Risk profiling across public corridors</p>
        </div>
        <div className="flex items-center gap-1 bg-surface-container rounded-lg p-1">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-2 py-0.5 rounded text-[11px] font-label-sm font-semibold transition-all ${
              filter === "all"
                ? "bg-surface-container-lowest text-on-surface shadow-xs"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            All
          </button>
          <button
            type="button"
            onClick={() => setFilter("urgent")}
            className={`px-2 py-0.5 rounded text-[11px] font-label-sm font-semibold transition-all ${
              filter === "urgent"
                ? "bg-surface-container-lowest text-on-surface shadow-xs"
                : "text-secondary hover:text-on-surface"
            }`}
          >
            Urgent
          </button>
        </div>
      </div>

      {/* Severity Distribution List */}
      <div className="space-y-3">
        {/* Critical Hazard Row */}
        <div className="p-3 rounded-xl bg-error-container/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-error-container flex items-center justify-center text-error shrink-0">
              <span className="material-symbols-outlined text-[18px]">report_problem</span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-title-md text-label-md text-on-error-container font-bold">Critical</span>
                <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
              </div>
              <span className="font-body-sm text-label-sm text-on-secondary-container">
                Structural rupture / high speed
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="font-title-md text-headline-sm text-error font-bold">42</span>
            <button
              type="button"
              onClick={handleDispatch}
              className="px-2.5 py-1 rounded bg-error text-on-error font-label-sm text-[11px] font-bold hover:opacity-95 transition-opacity"
            >
              Dispatch
            </button>
          </div>
        </div>

        {/* High Severity */}
        <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed-variant shrink-0">
              <span className="material-symbols-outlined text-[18px]">priority_high</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-label-md text-on-surface font-bold">High</span>
              <span className="font-body-sm text-label-sm text-secondary">Major tire damage profile</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-title-md text-title-md text-on-surface font-bold">376</span>
            <span className="font-label-sm text-[11px] text-secondary">(30.1%)</span>
          </div>
        </div>

        {/* Medium Severity */}
        <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant shrink-0">
              <span className="material-symbols-outlined text-[18px]">remove</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-label-md text-on-surface font-bold">Medium</span>
              <span className="font-body-sm text-label-sm text-secondary">Moderate asphalt cracking</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-title-md text-title-md text-on-surface font-bold">520</span>
            <span className="font-label-sm text-[11px] text-secondary">(41.7%)</span>
          </div>
        </div>

        {/* Low Severity */}
        <div className="p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed-variant shrink-0">
              <span className="material-symbols-outlined text-[18px]">check_small</span>
            </div>
            <div className="flex flex-col">
              <span className="font-title-md text-label-md text-on-surface font-bold">Low</span>
              <span className="font-body-sm text-label-sm text-secondary">Surface weathering</span>
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-title-md text-title-md text-on-surface font-bold">310</span>
            <span className="font-label-sm text-[11px] text-secondary">(24.8%)</span>
          </div>
        </div>
      </div>

      <div className="pt-2">
        <div className="flex items-center justify-between text-secondary font-label-sm text-label-sm">
          <span>Combined Severe (Crit + High):</span>
          <span className="font-bold text-on-surface">33.5% of backlog</span>
        </div>
      </div>
    </div>
  );
}
