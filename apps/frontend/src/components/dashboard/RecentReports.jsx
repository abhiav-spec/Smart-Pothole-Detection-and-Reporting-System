"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function RecentReports({ reports = [] }) {
  const [fetchedReports, setFetchedReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // If reports are passed via props, use them instead of fetching
    if (reports && reports.length > 0) {
      setFetchedReports(reports);
      setLoading(false);
      return;
    }

    const fetchRecentReports = async () => {
      try {
        const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api";
        // Fetch the 3 most recent potholes
        const res = await fetch(`${backendUrl}/potholes?limit=3&sort=createdAt:desc`);
        const json = await res.json();
        
        if (json.success && json.data) {
          // Map DB records to the UI structure
          const mapped = json.data.map(p => {
            let severityBg = "bg-surface-container-high text-on-surface-variant";
            let severityDot = "bg-secondary";
            if (p.severity === "CRITICAL") {
              severityBg = "bg-error-container text-on-error-container";
              severityDot = "bg-error animate-ping";
            } else if (p.severity === "HIGH") {
              severityBg = "bg-amber-100 text-amber-900";
              severityDot = "bg-amber-600";
            } else if (p.severity === "MEDIUM") {
              severityBg = "bg-orange-100 text-orange-900";
              severityDot = "bg-orange-500";
            }

            let statusBg = "bg-surface-container-high text-on-surface-variant";
            if (p.status === "REPORTED") statusBg = "bg-primary-container text-on-primary-container";
            if (p.status === "IN_PROGRESS") statusBg = "bg-primary-fixed/50 text-on-primary-fixed-variant";
            if (p.status === "RESOLVED") statusBg = "bg-tertiary-fixed/40 text-on-tertiary-fixed-variant";

            const timeAgo = p.createdAt ? `Reported ${new Date(p.createdAt).toLocaleDateString()}` : "Recently reported";
            const imageUrl = p.media && p.media.length > 0 ? p.media[0].url : "https://via.placeholder.com/400x300?text=No+Image";
            const confidenceStr = p.confidence ? `${Math.round(p.confidence * 100)}%` : "N/A";
            
            return {
              id: p.id.substring(0, 8), // shorten UUID
              location: `Lat: ${parseFloat(p.latitude).toFixed(4)}, Lng: ${parseFloat(p.longitude).toFixed(4)}`,
              timeAgo: timeAgo,
              severity: p.severity || "UNKNOWN",
              severityBg: severityBg,
              severityDot: severityDot,
              status: p.status || "UNKNOWN",
              statusBg: statusBg,
              aiMatch: confidenceStr,
              isVerifiedBadge: p.status === "RESOLVED",
              image: imageUrl,
              note: p.authority ? `Assigned to ${p.authority.name}` : "Pending assignment",
              noteIcon: p.authority ? "local_shipping" : "pending",
              noteColor: p.authority ? "text-secondary" : "text-on-surface-variant"
            };
          });
          setFetchedReports(mapped);
        }
      } catch (err) {
        console.error("Failed to fetch recent reports:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentReports();
  }, [reports]);

  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-space-sm">
        <div>
          <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-bold">
            Citizen Submissions
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Your Recent Reports
          </h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Track repairs and verification progress on issues you reported
          </p>
        </div>
        <Link
          href="/dashboard/reports"
          className="inline-flex items-center gap-1 font-label-md text-label-md text-primary hover:text-primary-container transition-colors font-semibold"
        >
          View All My Reports
          <span className="material-symbols-outlined text-[18px]">chevron_right</span>
        </Link>
      </div>

      {loading ? (
        <div className="w-full flex justify-center p-8">
          <span className="material-symbols-outlined animate-spin text-[32px] text-primary">refresh</span>
        </div>
      ) : fetchedReports.length === 0 ? (
        <div className="w-full bg-surface-container-low rounded-xl p-8 text-center text-on-surface-variant font-body-md">
          No recent reports found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
          {fetchedReports.map((report) => (
            <div
              key={report.id}
              className="rounded-xl bg-surface-container-lowest shadow-sm overflow-hidden flex flex-col hover:shadow-md transition-all"
            >
              {/* Image Preview & Badges */}
              <div className="relative h-48 w-full overflow-hidden bg-surface-container">
                <img
                  className="w-full h-full object-cover"
                  alt={`Pothole report #${report.id}`}
                  src={report.image}
                />
                <div className="absolute top-space-sm left-space-sm flex items-center gap-1.5 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full text-on-surface font-label-sm text-label-sm">
                  <span className="font-bold text-primary">#{report.id}</span>
                  <span>•</span>
                  <span>Ticket</span>
                </div>
                <div
                  className={`absolute bottom-space-sm right-space-sm ${
                    report.isVerifiedBadge
                      ? "bg-tertiary text-on-tertiary"
                      : "bg-inverse-surface/90 text-inverse-on-surface"
                  } text-[11px] px-2 py-0.5 rounded backdrop-blur-sm font-label-sm flex items-center gap-1`}
                >
                  {report.isVerifiedBadge && (
                    <span className="material-symbols-outlined text-[14px]">check</span>
                  )}
                  <span>{report.isVerifiedBadge ? "Verified" : `AI Match: ${report.aiMatch}`}</span>
                </div>
              </div>

              {/* Details Content */}
              <div className="p-space-md flex flex-col gap-space-md flex-1 justify-between">
                <div className="flex flex-col gap-space-xs">
                  <div className="flex items-center justify-between gap-2">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full ${report.severityBg} font-label-sm text-label-sm`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${report.severityDot}`}></span>
                      Severity: {report.severity}
                    </span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full ${report.statusBg} font-label-sm text-label-sm font-semibold`}>
                      {report.status === "RESOLVED" && (
                        <span className="material-symbols-outlined text-[14px]">done_all</span>
                      )}
                      {report.status}
                    </span>
                  </div>
                  <h3 className="font-title-md text-title-md text-on-surface font-semibold line-clamp-1">
                    {report.location}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">schedule</span>
                    {report.timeAgo}
                  </p>
                </div>

                {/* Status Footer Note */}
                <div className="pt-space-xs bg-surface-container-low p-2.5 rounded-lg flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className={`material-symbols-outlined text-[18px] ${report.noteColor}`}>
                      {report.noteIcon}
                    </span>
                    <span className="font-body-sm text-body-sm text-on-surface font-medium">
                      {report.note}
                    </span>
                  </div>
                  <span className="material-symbols-outlined text-[18px] text-on-surface-variant">
                    navigate_next
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
