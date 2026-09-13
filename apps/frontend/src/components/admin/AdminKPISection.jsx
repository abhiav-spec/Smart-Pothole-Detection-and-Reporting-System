"use client";

export default function AdminKPISection({ stats }) {
  // Default values based on design specifications
  const total = stats?.totalReports || 1248;
  const pending = stats?.pendingReports || 86;
  const highSeverity = stats?.highSeverity || 42;
  const resolved = stats?.resolved || 684;

  return (
    <section aria-label="Key Performance Indicators" className="flex flex-col gap-space-xs">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {/* KPI 1: Total Reports */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
              Total Reports
            </span>
            <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-primary">
              <span className="material-symbols-outlined text-[20px]">layers</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display-lg text-headline-lg text-on-surface tracking-tight">
              {total.toLocaleString()}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="font-label-sm text-label-sm text-tertiary font-bold bg-tertiary-container/15 px-1.5 py-0.5 rounded flex items-center gap-0.5">
                <span className="material-symbols-outlined text-[14px]">trending_up</span> +14%
              </span>
              <span className="font-body-sm text-body-sm text-secondary">vs last month</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full rounded-full" style={{ width: "72%" }}></div>
          </div>
        </div>

        {/* KPI 2: Pending Reports */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
              Pending Reports
            </span>
            <div className="w-9 h-9 rounded-lg bg-secondary-container/50 flex items-center justify-center text-on-secondary-container">
              <span className="material-symbols-outlined text-[20px]">hourglass_top</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display-lg text-headline-lg text-on-surface tracking-tight">
              {pending.toLocaleString()}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="font-label-sm text-label-sm text-on-secondary-fixed-variant bg-secondary-fixed px-1.5 py-0.5 rounded font-semibold">
                Requires AI/DPW triage
              </span>
            </div>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
            <div className="bg-secondary h-full rounded-full" style={{ width: "28%" }}></div>
          </div>
        </div>

        {/* KPI 3: High Severity */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-error-container/20 rounded-full blur-xl pointer-events-none"></div>
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
              High Severity
            </span>
            <div className="w-9 h-9 rounded-lg bg-error-container flex items-center justify-center text-error">
              <span className="material-symbols-outlined text-[20px]">warning</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display-lg text-headline-lg text-error tracking-tight">
              {highSeverity.toLocaleString()}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="font-label-sm text-label-sm text-on-error-container bg-error-container px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                Action Required
              </span>
              <span className="font-body-sm text-body-sm text-secondary truncate">Immediate hazard</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
            <div className="bg-error h-full rounded-full" style={{ width: "42%" }}></div>
          </div>
        </div>

        {/* KPI 4: Resolved */}
        <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm flex flex-col justify-between gap-space-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between">
            <span className="font-label-md text-label-md text-secondary font-semibold uppercase tracking-wider">
              Resolved
            </span>
            <div className="w-9 h-9 rounded-lg bg-surface-container flex items-center justify-center text-tertiary">
              <span className="material-symbols-outlined text-[20px]">task_alt</span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-display-lg text-headline-lg text-on-surface tracking-tight">
              {resolved.toLocaleString()}
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="font-label-sm text-label-sm text-on-tertiary bg-tertiary-container px-1.5 py-0.5 rounded font-semibold">
                54.8% rate
              </span>
              <span className="font-body-sm text-body-sm text-secondary">verified closed</span>
            </div>
          </div>
          <div className="w-full bg-surface-container-high h-1 rounded-full overflow-hidden">
            <div className="bg-tertiary-container h-full rounded-full" style={{ width: "55%" }}></div>
          </div>
        </div>
      </div>
      <p className="font-label-sm text-label-sm text-outline px-1">Visual placeholder metrics for operational monitoring.</p>
    </section>
  );
}
