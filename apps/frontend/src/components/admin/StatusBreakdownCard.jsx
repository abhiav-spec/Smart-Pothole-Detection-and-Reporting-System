"use client";

export default function StatusBreakdownCard() {
  const statusItems = [
    { label: "Reported", count: 86, percentage: "6.9%", colorBg: "bg-secondary-fixed-dim" },
    { label: "Verified", count: 214, percentage: "17.1%", colorBg: "bg-primary-fixed-dim" },
    { label: "Assigned", count: 142, percentage: "11.4%", colorBg: "bg-primary-container" },
    { label: "In Progress", count: 72, percentage: "5.8%", colorBg: "bg-secondary-container" },
    { label: "Resolved", count: 684, percentage: "54.8%", colorBg: "bg-tertiary-container", highlight: true },
    { label: "Rejected", count: 50, percentage: "4.0%", colorBg: "bg-outline-variant" },
  ];

  return (
    <div className="lg:col-span-7 bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col justify-between gap-space-md">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="font-headline-sm text-headline-sm text-on-surface">Reports by Status</h2>
          <p className="font-body-sm text-body-sm text-secondary">Municipal lifecycle triage &amp; dispatch funnel</p>
        </div>
        <span className="font-label-sm text-label-sm text-primary font-semibold bg-primary-container/10 px-2.5 py-1 rounded-full">
          1,248 Total Items
        </span>
      </div>

      {/* Horizontal Multi-segment visual bar */}
      <div className="flex flex-col gap-2 my-space-xs">
        <div className="w-full h-3.5 bg-surface-container rounded-full overflow-hidden flex gap-0.5 p-0.5">
          <div className="bg-secondary-fixed-dim rounded-l-full h-full transition-all hover:opacity-80" style={{ width: "6.9%" }} title="Reported (86)"></div>
          <div className="bg-primary-fixed-dim h-full transition-all hover:opacity-80" style={{ width: "17.1%" }} title="Verified (214)"></div>
          <div className="bg-primary-container h-full transition-all hover:opacity-80" style={{ width: "11.4%" }} title="Assigned (142)"></div>
          <div className="bg-secondary-container h-full transition-all hover:opacity-80" style={{ width: "5.8%" }} title="In Progress (72)"></div>
          <div className="bg-tertiary-container h-full transition-all hover:opacity-80" style={{ width: "54.8%" }} title="Resolved (684)"></div>
          <div className="bg-outline-variant rounded-r-full h-full transition-all hover:opacity-80" style={{ width: "4.0%" }} title="Rejected (50)"></div>
        </div>
        <div className="flex items-center justify-between text-secondary font-label-sm text-[11px] px-1">
          <span>Intake (6.9%)</span>
          <span>Active Triage &amp; Works (34.3%)</span>
          <span>Closed (58.8%)</span>
        </div>
      </div>

      {/* Detailed Status Legend Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-space-sm pt-space-xs">
        {statusItems.map((item) => (
          <div key={item.label} className="p-2.5 rounded-lg bg-surface-container-low flex flex-col gap-0.5">
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${item.colorBg}`}></span>
              <span className="font-label-md text-label-md text-on-surface">{item.label}</span>
            </div>
            <div className="flex items-baseline justify-between mt-1">
              <span className={`font-title-md text-title-md font-bold ${item.highlight ? "text-tertiary" : "text-on-surface"}`}>
                {item.count}
              </span>
              <span className="font-label-sm text-[11px] text-secondary">{item.percentage}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
