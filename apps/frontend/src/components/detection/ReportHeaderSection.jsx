"use client";

export default function ReportHeaderSection() {
  return (
    <div className="py-6 border-b border-slate-200/80 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-800 text-xs font-semibold tracking-wide mb-2.5">
          <span className="material-symbols-outlined text-[16px] text-emerald-600">
            volunteer_activism
          </span>
          City Road Maintenance & Public Safety
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
          Report a Road Hazard or Pothole
        </h1>
        <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
          Snap a photo and confirm your location. We will immediately forward your report to the city maintenance crew to keep your neighborhood streets smooth and safe.
        </p>
      </div>

      {/* Human Support Badge */}
      <div className="flex items-center gap-3 bg-white px-4 py-3 rounded-2xl border border-slate-200/80 shadow-sm shrink-0">
        <div className="w-10 h-10 rounded-xl bg-teal-50 text-primary flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[22px]">engineering</span>
        </div>
        <div>
          <div className="text-xs font-bold text-slate-800">Public Works Dispatch</div>
          <div className="text-[11px] text-slate-500">Crews review reports within 24 hours</div>
        </div>
      </div>
    </div>
  );
}
