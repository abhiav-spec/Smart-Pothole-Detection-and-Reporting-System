"use client";

import Link from "next/link";

export default function WelcomeBanner({ user }) {
  const userName = user?.name || "Abhinav";
  const roleText = user?.role === "AUTHORITY" ? "Municipal Admin • Active" : "Citizen Reporter • Active";

  return (
    <section className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-space-lg md:p-space-xl shadow-sm">
      {/* Background Decorators */}
      <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-primary/5 pointer-events-none blur-3xl"></div>
      <div className="absolute right-1/4 -bottom-24 w-80 h-80 rounded-full bg-secondary-container/40 pointer-events-none blur-2xl"></div>

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-space-lg">
        <div className="flex flex-col gap-space-xs max-w-2xl">
          <div className="flex flex-wrap items-center gap-space-xs">
            <span className="inline-flex items-center gap-1.5 px-space-sm py-1 rounded-full bg-tertiary/10 text-tertiary font-label-sm text-label-sm font-semibold">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              {roleText}
            </span>
            <span className="font-label-sm text-label-sm text-on-surface-variant bg-surface-container-low px-2 py-1 rounded-full font-medium">
              Ward 7 • Metro District
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            Welcome back, {userName}
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            Help make roads safer by reporting potholes around you.
          </p>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center gap-space-sm shrink-0">
          <Link
            href="/detect"
            className="inline-flex items-center justify-center gap-2 h-11 px-space-lg rounded-lg bg-primary hover:bg-primary-container text-on-primary font-title-md text-title-md transition-colors shadow-sm font-semibold"
          >
            <span className="material-symbols-outlined text-[20px]">add_a_photo</span>
            Report a Pothole
          </Link>
          <Link
            href="/dashboard/map"
            className="inline-flex items-center justify-center gap-2 h-11 px-space-lg rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-title-md text-title-md transition-colors font-semibold"
          >
            <span className="material-symbols-outlined text-[20px] text-primary">
              location_on
            </span>
            Explore Map
          </Link>
        </div>
      </div>
    </section>
  );
}
