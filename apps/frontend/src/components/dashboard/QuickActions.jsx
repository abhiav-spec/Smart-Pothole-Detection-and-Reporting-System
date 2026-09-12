"use client";

import Link from "next/link";

export default function QuickActions({ onLogoutClick }) {
  return (
    <section className="flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <div>
          <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider font-bold">
            Quick Actions
          </span>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold">
            Citizen Operations Center
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md">
        {/* Card 1: Report a Pothole */}
        <div className="group relative rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="absolute inset-x-0 top-0 h-1 bg-primary rounded-t-xl"></div>
          <div className="flex flex-col gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">photo_camera</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                  Report a Pothole
                </h3>
                <span className="font-label-sm text-label-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                  Priority
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Upload a photo or video of a pothole and help improve road safety.
              </p>
            </div>
          </div>
          <div className="pt-space-md">
            <Link
              href="/detect"
              className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-primary hover:bg-primary-container text-on-primary font-label-md text-label-md transition-colors font-semibold"
            >
              Upload & Report
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </Link>
          </div>
        </div>

        {/* Card 2: Explore Map */}
        <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex flex-col gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">map</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                Explore Map
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                See reported potholes and road issues around you with live severity status.
              </p>
            </div>
          </div>
          <div className="pt-space-md">
            <Link
              href="/dashboard/map"
              className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">explore</span>
              View Map
            </Link>
          </div>
        </div>

        {/* Card 3: My Account */}
        <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex flex-col gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-surface-container-high text-on-surface flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">badge</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                My Account
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Manage your profile and view your account information.
              </p>
            </div>
          </div>
          <div className="pt-space-md">
            <Link
              href="/dashboard/settings"
              className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              View Account
            </Link>
          </div>
        </div>

        {/* Card 4: Logout */}
        <div className="rounded-xl bg-surface-container-lowest p-space-lg shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
          <div className="flex flex-col gap-space-md">
            <div className="w-12 h-12 rounded-lg bg-error-container/60 text-on-error-container flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">logout</span>
            </div>
            <div className="flex flex-col gap-1">
              <h3 className="font-title-md text-title-md text-on-surface font-semibold">
                Logout
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                Sign out securely from your PotholeAI account.
              </p>
            </div>
          </div>
          <div className="pt-space-md">
            <button
              type="button"
              onClick={onLogoutClick}
              className="inline-flex items-center justify-center gap-2 w-full h-11 rounded-lg bg-surface-container hover:bg-error-container/30 text-error font-label-md text-label-md transition-colors font-semibold"
            >
              <span className="material-symbols-outlined text-[18px]">
                power_settings_new
              </span>
              Logout
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
