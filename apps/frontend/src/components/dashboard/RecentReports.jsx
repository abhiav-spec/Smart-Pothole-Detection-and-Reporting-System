"use client";

import Link from "next/link";

export default function RecentReports({ reports = [] }) {
  // Default mock reports if none supplied
  const sampleReports = reports.length > 0 ? reports : [
    {
      id: "8492",
      location: "Oakridge Way & 4th Ave",
      timeAgo: "Reported 2 days ago",
      severity: "High",
      severityBg: "bg-amber-100 text-amber-900",
      severityDot: "bg-amber-600",
      status: "In Progress",
      statusBg: "bg-primary-fixed/50 text-on-primary-fixed-variant",
      aiMatch: "96%",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBUL0yCOB3WXVUA7QDfirHgEUMNMUpZb4cvVZseTrshf2JwhiEVCsZfvXYfd-evYYhc_dCrflyu8jcmgty5fqDZs-mattdeIlNhDpea1upSthPYxbjBZy1LesA6o45ybqKNrw7dOMevetuxvkeemzYw4o3X75bzrrig3FwlWGbyu_Ux2IVmXQP7qUt3epfxrg7C6a-mpzdq21AX8YMg0hycAdggVy2lggKqD8E26OxHZHLjI4vLu-CC7Q",
      note: "Crew scheduled for patching",
      noteIcon: "engineering",
      noteColor: "text-primary"
    },
    {
      id: "8104",
      location: "Market St & 12th St",
      timeAgo: "Reported May 18",
      severity: "Critical",
      severityBg: "bg-error-container text-on-error-container",
      severityDot: "bg-error animate-ping",
      status: "Assigned to DPW",
      statusBg: "bg-secondary-container text-on-secondary-container",
      aiMatch: "99%",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD2i4AbJJACvpvh2-tOVFycX4AK2j8-38U7VkP6st5RCW4keGucv8x2WzTYVrzPCkDuB9btBhFFrXSD4_P0qFyzI7p_VrTG7-1FhO9-4CeyWO1Irt7DZQNW-e07yAC0DE3fLt7cJv-bzuOOQTOKpASkDkUTE6nLE9wuFYsN1XsLVnGfJfzO8ozuhr-4iaZDJZMp_7PtKHguxPMQHMg32ljgjWvcX6tlkVCE4wsHcQA3yqhF4JDE0KMzJQ",
      note: "Department of Public Works dispatched",
      noteIcon: "local_shipping",
      noteColor: "text-secondary"
    },
    {
      id: "7890",
      location: "Pine Valley Blvd",
      timeAgo: "Reported April 29",
      severity: "Low",
      severityBg: "bg-surface-container-high text-on-surface-variant",
      severityDot: "bg-secondary",
      status: "Resolved",
      statusBg: "bg-tertiary-fixed/40 text-on-tertiary-fixed-variant",
      aiMatch: "Verified",
      isVerifiedBadge: true,
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFKTJq55lSTMEanDh7J11dh0ItMQ08WB6VeDsjHGqzuqu9SJeCJqF0X1s18flfQw82AJojE_yvXPmZnuqWJXBsJCP37lTEgZnNLMmsXrOGNJRx0QPvWbFDqqR3NBd6vvMVQgRTKhkgnFYi-BpxJ7pLWmB5MiXVYLVYVXDpUpULHa9_FmqG5fRKHybrlblIM-0KbX4YV5DtgkgZvFSE0PC1Ly88tYKsAJODODHAwtohwpxUd6ewTbWIOw",
      note: "Inspection completed & closed",
      noteIcon: "task_alt",
      noteColor: "text-tertiary"
    }
  ];

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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        {sampleReports.map((report) => (
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
                    {report.status === "Resolved" && (
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
    </section>
  );
}
