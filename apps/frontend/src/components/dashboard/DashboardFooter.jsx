"use client";

export default function DashboardFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 mt-auto">
      <div className="max-w-[1440px] mx-auto px-gutter py-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
          <span className="font-semibold text-on-surface">PotholeAI Civic Intelligence</span>
          <span>•</span>
          <span>Municipal Road Quality & Hazard System</span>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          © 2025 PotholeAI Portal. Dedicated to safer roadways.
        </p>
      </div>
    </footer>
  );
}
