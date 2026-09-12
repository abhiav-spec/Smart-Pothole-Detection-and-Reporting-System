"use client";

export default function LocationVerificationSection({
  locationData,
  fetchingGps,
  submitting,
  submitSuccess,
  onFetchGps,
  onSubmitReport,
  error
}) {
  return (
    <div className="lg:col-span-5 flex flex-col gap-6 sticky top-24">
      {/* Mandatory Location Step Title */}
      <div className="flex items-center gap-2.5">
        <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-display text-xs font-bold">
          2
        </span>
        <h2 className="font-display font-bold text-lg text-slate-900">
          Device Location Verification
        </h2>
        <span className="text-xs font-semibold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded border border-rose-200/80 ml-auto">
          Mandatory
        </span>
      </div>

      {/* Prominent Mandatory Location Verification Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border-2 border-teal-200 shadow-sm relative overflow-hidden">
        {/* Top Status Ribbon */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="font-display font-bold text-sm text-slate-900">
              Device Location Access
            </span>
          </div>
          <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
            {locationData.locked ? "Mandatory • GPS Locked" : "Mandatory • Active"}
          </span>
        </div>

        {/* Why Location Is Strictly Required */}
        <div className="bg-teal-50/60 border border-teal-100 rounded-2xl p-4 mb-4">
          <div className="flex items-start gap-2.5">
            <span className="material-symbols-outlined text-primary text-[20px] shrink-0 mt-0.5">
              info
            </span>
            <p className="text-xs text-slate-700 leading-relaxed font-normal">
              <strong className="font-semibold text-slate-900">Location access is required</strong> so our maintenance team knows exactly where to fix the pothole. Without precise coordinates, crews cannot locate the hazard on city streets.
            </p>
          </div>
        </div>

        {/* Detected Location Box */}
        <div className="border border-slate-200 bg-slate-50/80 rounded-2xl p-4 mb-4">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[19px]">my_location</span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">
                  {locationData.title || "Oakridge Way & 4th Ave"}
                </div>
                <div className="text-[11px] text-slate-500">
                  {locationData.district || "San Francisco, CA • District 5"}
                </div>
              </div>
            </div>
            <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full font-semibold">
              GPS Verified
            </span>
          </div>

          {/* GPS Detail Coordinates */}
          <div className="mt-3 pt-3 border-t border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-600">
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-700">
              <span className="material-symbols-outlined text-[15px] text-primary">pin_drop</span>
              <span>
                {locationData.latitude.toFixed(4)}° N, {locationData.longitude.toFixed(4)}° W
              </span>
            </div>
            <span className="text-[11px] text-slate-500 font-medium">
              {locationData.accuracy || "GPS Accuracy: ±3m"}
            </span>
          </div>
        </div>

        {/* Allow / Re-check Device Location Button */}
        <div className="flex flex-col gap-2.5 mb-4">
          <button
            type="button"
            onClick={onFetchGps}
            disabled={fetchingGps}
            className="w-full py-3 px-4 rounded-xl bg-teal-50 hover:bg-teal-100/80 border-2 border-primary text-primary font-display font-bold text-sm transition-all flex items-center justify-center gap-2.5 shadow-sm active:scale-[0.99] group disabled:opacity-60"
          >
            <div className="w-7 h-7 rounded-lg bg-primary text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
              <span className={`material-symbols-outlined text-[18px] ${fetchingGps ? "animate-spin" : ""}`}>
                {fetchingGps ? "refresh" : "my_location"}
              </span>
            </div>
            <span>
              {fetchingGps ? "Detecting device GPS..." : "Open Device Location & Fetch GPS"}
            </span>
            <span className="material-symbols-outlined text-[18px] text-teal-600 ml-auto group-hover:translate-x-0.5 transition-transform">
              near_me
            </span>
          </button>
          <div className="flex items-center justify-between px-1 text-[11px] text-slate-500">
            <span>Tap to prompt browser location permission</span>
            <span className="inline-flex items-center gap-1 text-teal-700 font-semibold">
              <span className="material-symbols-outlined text-[13px]">gps_fixed</span>
              High Accuracy Mode
            </span>
          </div>
        </div>

        {/* Error notification if any */}
        {error && (
          <div className="p-3 mb-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Anti-Spam / Anti-False Report Notice */}
        <div className="flex items-start gap-2 text-[11px] text-amber-800 bg-amber-50/70 border border-amber-200/80 rounded-xl p-3 mb-4">
          <span className="material-symbols-outlined text-[17px] text-amber-600 shrink-0 mt-0.5">
            verified_user
          </span>
          <span>
            <strong>Verified Reporting Policy:</strong> We cannot accept reports without verified GPS location coordinates to prevent false or untraceable hazard reports.
          </span>
        </div>

        {/* Privacy & Trust Notice */}
        <div className="flex items-center gap-2 text-[11px] text-slate-500 border-t border-slate-100 pt-3">
          <span className="material-symbols-outlined text-[16px] text-slate-400 shrink-0">
            lock
          </span>
          <span>
            <strong>Privacy protected:</strong> Your location is only captured once when you submit this report. No background tracking.
          </span>
        </div>

        {/* Main Citizen Action CTA */}
        <div className="mt-5 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onSubmitReport}
            disabled={submitting || submitSuccess}
            className={`w-full py-4 px-6 rounded-2xl font-display font-bold text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2.5 ${
              submitSuccess
                ? "bg-emerald-600 text-white shadow-emerald-200"
                : "bg-gradient-to-r from-primary to-teal-600 hover:from-primary-container hover:to-teal-700 text-white shadow-primary/20 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.99]"
            } disabled:opacity-75`}
          >
            <span className={`material-symbols-outlined text-[21px] ${submitting ? "animate-spin" : ""}`}>
              {submitting ? "sync" : submitSuccess ? "check_circle" : "send"}
            </span>
            <span>
              {submitting
                ? "Submitting to Public Works..."
                : submitSuccess
                ? "Report Submitted! Work Order Created"
                : "Confirm Location & Submit Road Report"}
            </span>
            {!submitting && !submitSuccess && (
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            )}
          </button>
          <p className="text-[11px] text-center text-slate-400 mt-2.5">
            Instant notification sent to the nearest municipal road repair unit.
          </p>
        </div>
      </div>

      {/* Helpful Community Care Card */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
          <span className="material-symbols-outlined text-[20px]">report_problem</span>
        </div>
        <div className="text-xs text-slate-600">
          <strong className="text-slate-800">Is this an immediate emergency?</strong> If a pothole poses sudden danger on a high-speed freeway, call <strong>311</strong> or local emergency dispatch directly.
        </div>
      </div>
    </div>
  );
}
