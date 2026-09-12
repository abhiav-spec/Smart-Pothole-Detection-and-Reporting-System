"use client";

import Link from "next/link";

export default function HazardAlertBanner() {
  return (
    <section className="rounded-xl bg-surface-container-low p-space-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-space-md shadow-sm">
      <div className="flex items-start gap-space-md">
        <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-sm shrink-0">
          <span className="material-symbols-outlined text-[22px]">sensors</span>
        </div>
        <div className="flex flex-col">
          <h4 className="font-title-md text-title-md text-on-surface font-semibold">
            Nearby Road Hazard Alerts
          </h4>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            2 high-priority hazards flagged by fellow citizens within 1.5 miles of your active reporting sector.
          </p>
        </div>
      </div>
      <Link
        href="/dashboard/map"
        className="inline-flex items-center gap-2 px-space-md py-2 rounded-lg bg-surface-container-lowest hover:bg-surface-container-highest text-on-surface font-label-md text-label-md shadow-sm transition-colors shrink-0 font-semibold"
      >
        Open Radar
        <span className="material-symbols-outlined text-[18px]">travel_explore</span>
      </Link>
    </section>
  );
}
