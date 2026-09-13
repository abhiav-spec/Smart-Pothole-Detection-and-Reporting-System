"use client";

import { useState } from "react";
import Link from "next/link";

const initialReports = [
  {
    id: "PH-1042",
    location: "MG Road, Guna",
    subLocation: "Near Central Square • Lat 24.643",
    severity: "Critical",
    status: "Verified",
    date: "12 Sep 2026",
    notes: "94% Confidence AI edge detector. Roadway hazard index 8.7/10. High traffic zone.",
    confidence: "94%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA5BEuiBnzft-QLAKTmaS9DNI1N8JndksA71F-Gcj1xV8FVA3D8Aq65z25P9Wtcmb_YrSs1q_AM_ivGcKekC4u7RIZK67u1Bjt6o14gJK0gGiZDkyQwQb5tiAnFWj1s_3zzHPR8dCC9X8XbJrHKxkfcKtrI6VgSrrtytQcm8-sAYsZoE8yTQVQBFmuNCUIkizgnsHCoSyitZnpsEVSXLnfRCBWub7Fdha3CnSqctCRmrZ0NO8TsXy1gxA",
  },
  {
    id: "PH-1024",
    location: "Station Road, Sector 4",
    subLocation: "Transit Hub Junction • Lat 24.651",
    severity: "High",
    status: "Assigned DPW",
    date: "11 Sep 2026",
    notes: "Work order 2049 generated. Alpha Crew assigned with cold patch mix unit.",
    confidence: "89%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAfmLczIf0dlmyg64xYKcXo3kIFbJvGb-ubVJhP2JSFLCzIG-EFhlNvFN_9EExd-s9rPdn_gxLIqHU1aBWnDja1WLKZVVeWkzWhnqPt1nO1bTKdFzeeXmuZf23cULcI_7V4kRU7Gi7EFp9zHGaWnndr0NcujdH10tS3TUqboNkglc7_t3xXMu7-5tqeSsuKRD6pl0n3z4Y5KC0e3kSilWFnPohGzZdwFo4MVI_UUh4W3dfzINW_DaqIMw",
  },
  {
    id: "PH-1018",
    location: "Bypass Expressway Km 12",
    subLocation: "Outer Ring Road • Lat 24.619",
    severity: "Medium",
    status: "In Progress",
    date: "10 Sep 2026",
    notes: "Asphalt levelling vehicle on site. Lane 2 partially diverted.",
    confidence: "91%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAQs6ZLFVmn11NAtemj6BJwr0SVBtR4n3MrWfo-3Po9RuKyMc5KR-CULSxX2QznH5ZOEZm6-aymngtOzSFdtmJNMvIO_15EK9-C_hiwXTQycENj_DZEwEZ66-C0ZWirBEFOS_jzkNAPp7CmS4o-oVphDsHTmNkyttMmlu8WArClQjN077RtjOWUlLkW3Nf8ddl2YQKlXOWtVSiQNpqfmbkpHXwhifTUIw6XfMqmKtEZyaBJt5M6k5qx8g",
  },
  {
    id: "PH-0995",
    location: "Civil Lines 3rd Ave",
    subLocation: "Block B residential • Lat 24.634",
    severity: "Low",
    status: "Reported",
    date: "10 Sep 2026",
    notes: "Citizen reported via mobile app. Queued for standard cyclical maintenance sweep.",
    confidence: "78%",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBjSI3HVCK2BCE2Q-0DuFWlO8Vw0OP_d4TovKM2r3LjG5vYXm7J79eZj6KRWreXsbsiiXZqJXZh9XlWbiT-Pg3rTPIbhPZoBmYoVddLHHdv68z41wUlcPRFbJ3QXA9crXXsJzD7IIaV8uws0U33gzb4IxNpA8rYtF0Fv2Bc-9JLkUQl79slOmZNNJ3t3N7lbPcwXj1cvY-BMfPVyZYUHpShVXI2lWybPXA7QPTW_nVSufOmz0thX5yBBg",
  },
];

export default function AdminReportsTable({ onOpenReportModal }) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredReports = initialReports.filter(
    (item) =>
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flex flex-col gap-space-md">
      {/* Table Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div className="flex flex-col">
          <h2 className="font-headline-md text-headline-md text-on-surface">Recent Reports</h2>
          <p className="font-body-sm text-body-sm text-secondary">
            Real-time incident ingestion stream with verified GPS markers
          </p>
        </div>
        <div className="flex items-center gap-space-sm">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[18px] text-outline">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by ID or road..."
              className="h-10 pl-9 pr-3 rounded-lg bg-surface-container-lowest text-on-surface placeholder:text-outline font-body-sm text-body-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary w-48 sm:w-64"
            />
          </div>
          <button
            type="button"
            className="h-10 px-3 rounded-lg bg-surface-container-lowest text-on-surface hover:bg-surface-container-high font-title-md text-body-sm shadow-sm flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[18px] text-secondary">tune</span>
            <span className="hidden sm:inline">Filters</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                <th scope="col" className="py-3 px-4">
                  Preview
                </th>
                <th scope="col" className="py-3 px-4">
                  Report ID
                </th>
                <th scope="col" className="py-3 px-4">
                  Location
                </th>
                <th scope="col" className="py-3 px-4">
                  Severity
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Date
                </th>
                <th scope="col" className="py-3 px-4 text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-on-surface font-body-sm text-body-sm">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-surface-container-low/60 transition-colors">
                  {/* Preview Thumbnail */}
                  <td className="py-3.5 px-4">
                    <div className="w-14 h-11 rounded-lg overflow-hidden relative shadow-xs bg-surface-container">
                      <img
                        src={report.image}
                        alt={`Pothole preview for ${report.id}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-0.5 right-0.5 bg-inverse-surface/80 text-[9px] text-surface font-mono px-1 rounded">
                        {report.confidence}
                      </div>
                    </div>
                  </td>

                  {/* Report ID */}
                  <td className="py-3.5 px-4 font-title-md text-body-md font-bold text-on-surface">
                    #{report.id}
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col">
                      <span className="font-title-md text-body-md font-semibold text-on-surface">
                        {report.location}
                      </span>
                      <span className="font-body-sm text-[11px] text-secondary">
                        {report.subLocation}
                      </span>
                    </div>
                  </td>

                  {/* Severity */}
                  <td className="py-3.5 px-4">
                    {report.severity === "Critical" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-label-sm font-bold bg-error-container text-on-error-container">
                        <span className="w-1.5 h-1.5 rounded-full bg-error animate-ping"></span>
                        Critical
                      </span>
                    )}
                    {report.severity === "High" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-label-sm font-bold bg-secondary-fixed text-on-secondary-fixed-variant">
                        High
                      </span>
                    )}
                    {report.severity === "Medium" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-label-sm font-bold bg-primary-fixed text-on-primary-fixed-variant">
                        Medium
                      </span>
                    )}
                    {report.severity === "Low" && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-label-sm font-bold bg-tertiary-fixed text-on-tertiary-fixed-variant">
                        Low
                      </span>
                    )}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    {report.status === "Verified" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-label-sm font-semibold bg-primary-fixed-dim/40 text-on-primary-fixed-variant">
                        <span className="material-symbols-outlined text-[14px]">verified</span>
                        Verified
                      </span>
                    )}
                    {report.status === "Assigned DPW" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-label-sm font-semibold bg-primary-container/20 text-primary">
                        <span className="material-symbols-outlined text-[14px]">engineering</span>
                        Assigned DPW
                      </span>
                    )}
                    {report.status === "In Progress" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-label-sm font-semibold bg-secondary-container text-on-secondary-container">
                        <span className="material-symbols-outlined text-[14px]">pending</span>
                        In Progress
                      </span>
                    )}
                    {report.status === "Reported" && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-label-sm font-semibold bg-surface-container-high text-secondary">
                        <span className="material-symbols-outlined text-[14px]">flag</span>
                        Reported
                      </span>
                    )}
                  </td>

                  {/* Date */}
                  <td className="py-3.5 px-4 text-secondary whitespace-nowrap">
                    {report.date}
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onOpenReportModal(report)}
                      className="px-3 py-1.5 rounded-lg bg-surface-container text-primary hover:bg-primary hover:text-on-primary font-title-md text-body-sm font-semibold transition-all shadow-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="p-space-md bg-surface-container-low flex items-center justify-between">
          <span className="font-body-sm text-body-sm text-secondary">
            Showing {filteredReports.length} of 1,248 municipal damage records
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/dashboard/reports"
              className="font-title-md text-label-md text-primary font-bold hover:underline flex items-center gap-1"
            >
              <span>View Full Directory</span>
              <span className="material-symbols-outlined text-[16px]">chevron_right</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
