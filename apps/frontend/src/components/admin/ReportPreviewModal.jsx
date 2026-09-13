"use client";

export default function ReportPreviewModal({ report, onClose }) {
  if (!report) return null;

  return (
    <div
      className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-xs z-50 flex items-center justify-center p-space-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-lg w-full p-space-lg flex flex-col gap-space-md animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex flex-col">
            <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
              #{report.id}
            </span>
            <span className="font-body-sm text-body-sm text-secondary mt-0.5">
              {report.location} {report.subLocation ? `• ${report.subLocation}` : ""}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-high flex items-center justify-center text-secondary transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">close</span>
          </button>
        </div>

        {/* Severity & Status */}
        <div className="grid grid-cols-2 gap-space-sm">
          <div className="p-3 bg-surface-container-low rounded-lg flex flex-col">
            <span className="font-label-sm text-[11px] text-secondary uppercase font-semibold">Severity</span>
            <span className="font-title-md text-body-md font-bold text-on-surface mt-0.5">
              {report.severity}
            </span>
          </div>
          <div className="p-3 bg-surface-container-low rounded-lg flex flex-col">
            <span className="font-label-sm text-[11px] text-secondary uppercase font-semibold">Status</span>
            <span className="font-title-md text-body-md font-bold text-primary mt-0.5">
              {report.status}
            </span>
          </div>
        </div>

        {/* AI Triage Notes */}
        <div className="flex flex-col gap-1">
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            AI Triage Notes
          </span>
          <p className="font-body-md text-body-sm text-on-surface bg-surface-container-low p-3 rounded-lg leading-relaxed">
            {report.notes || "Operational details placeholder."}
          </p>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-space-xs border-t border-surface-container">
          <span className="font-label-sm text-label-sm text-secondary">
            Reported: {report.date}
          </span>
          <div className="flex items-center gap-space-xs">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded-lg bg-surface-container text-on-surface font-title-md text-body-sm hover:bg-surface-container-high transition-colors"
            >
              Dismiss
            </button>
            <button
              type="button"
              onClick={() => {
                alert(`Navigating to full report inspection file for ${report.id}...`);
                onClose();
              }}
              className="px-4 py-2 rounded-lg bg-primary text-on-primary font-title-md text-body-sm font-semibold hover:bg-primary-container transition-colors shadow-xs"
            >
              Open File
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
