"use client";

import { useState } from "react";
import Link from "next/link";

export default function DashboardHeader({ user, onLogoutClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const userName = user?.name || "Abhinav";
  const userRole = user?.role === "AUTHORITY" ? "Municipal Admin" : "Citizen Reporter";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30">
      <div className="h-16 w-full max-w-[1440px] mx-auto px-gutter flex items-center justify-between">
        {/* Brand Logo & Title */}
        <Link href="/dashboard" className="flex items-center gap-space-sm">
          <img
            alt="PotholeAI Brand Logo"
            className="h-8 w-auto object-contain"
            src="/images/logo.jpg"
          />
          <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
            PotholeAI
          </span>
          <span className="hidden lg:inline-flex items-center px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider ml-space-xs">
            Civic Portal
          </span>
        </Link>

        {/* Navigation Menu */}
        <nav className="hidden md:flex items-center gap-space-xs p-1 bg-surface-container-low rounded-xl">
          <Link
            href="/dashboard"
            className="px-space-md py-space-xs rounded-lg transition-all bg-primary-container text-on-primary-container font-label-md"
          >
            Home
          </Link>
          <Link
            href="/dashboard/map"
            className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-all"
          >
            Explore Map
          </Link>
          <Link
            href="/detect"
            className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-all"
          >
            Report Pothole
          </Link>
        </nav>

        {/* User Account Menu */}
        <div className="flex items-center gap-space-md">
          <div className="relative">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-space-sm py-1.5 px-2 rounded-xl hover:bg-surface-container-low transition-colors text-left focus:outline-none"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-[18px]">
                  person
                </span>
              </div>
              <div className="hidden sm:flex flex-col">
                <div className="flex items-center gap-space-xs">
                  <span className="font-label-md text-label-md text-on-surface leading-tight font-semibold">
                    {userName}
                  </span>
                  <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                    expand_more
                  </span>
                </div>
                <span className="inline-flex items-center text-[10px] leading-3 font-semibold text-tertiary bg-tertiary-fixed/30 border border-tertiary/20 px-1.5 py-0.5 rounded-full mt-0.5">
                  {userRole}
                </span>
              </div>
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 top-full mt-1 w-52 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-[0_4px_16px_rgba(15,23,42,0.08)] py-1.5 z-50">
                <div className="px-space-md py-space-xs border-b border-outline-variant/20 sm:hidden">
                  <p className="font-label-md text-label-md text-on-surface font-semibold">{userName}</p>
                  <span className="inline-flex items-center text-[10px] font-semibold text-tertiary bg-tertiary-fixed/30 px-1.5 py-0.5 rounded-full">
                    {userRole}
                  </span>
                </div>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-space-sm px-space-md py-2 font-body-sm text-body-sm text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                    manage_accounts
                  </span>
                  My Account
                </Link>
                <div className="my-1 border-t border-outline-variant/20"></div>
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen(false);
                    onLogoutClick();
                  }}
                  className="w-full flex items-center gap-space-sm px-space-md py-2 font-body-sm text-body-sm text-error hover:bg-error-container/40 transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-error text-[18px]">
                    logout
                  </span>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
