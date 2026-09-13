"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";

export default function AdminHeader({ onOpenLogout }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const notifRef = useRef(null);
  const userRef = useRef(null);

  // Close dropdowns on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (userRef.current && !userRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-64 right-0 h-16 bg-surface-container-lowest/90 backdrop-blur-md border-b border-outline-variant/25 z-30">
      <div className="h-16 w-full px-space-lg flex items-center justify-between gap-space-md">
        {/* Left Breadcrumb & Status */}
        <div className="flex items-center gap-space-md">
          <div className="flex items-center gap-space-xs font-title-md text-body-md text-on-surface-variant">
            <span className="text-secondary hover:text-on-surface transition-colors cursor-pointer">
              Operations
            </span>
            <span className="material-symbols-outlined text-[16px] text-outline">chevron_right</span>
            <span className="font-semibold text-on-surface">Municipal DPW</span>
          </div>

          <div className="hidden sm:flex items-center gap-2 px-space-sm py-1 rounded-full bg-surface-container border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
            <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
              DPW Grid: <strong className="text-tertiary">Operational</strong>
            </span>
          </div>
        </div>

        {/* Right Action Icons & Menus */}
        <div className="flex items-center gap-space-md">
          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              aria-label="Notifications"
              onClick={() => setShowNotifications((prev) => !prev)}
              className="p-2 rounded-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors relative flex items-center justify-center"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-error text-on-error font-label-sm text-[10px] font-bold rounded-full flex items-center justify-center leading-none ring-2 ring-surface-container-lowest">
                3
              </span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 py-space-sm z-50">
                <div className="px-space-md py-space-xs border-b border-outline-variant/20 flex items-center justify-between">
                  <span className="font-title-md text-label-md text-on-surface font-bold">System Alerts</span>
                  <button
                    type="button"
                    onClick={() => setShowNotifications(false)}
                    className="font-label-sm text-label-sm text-primary cursor-pointer hover:underline"
                  >
                    Clear all
                  </button>
                </div>
                <div className="divide-y divide-outline-variant/15">
                  <div className="px-space-md py-2.5 hover:bg-surface-container-low transition-colors flex items-start gap-space-xs cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-error mt-1.5 shrink-0"></span>
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-sm font-semibold text-on-surface">
                        New critical pothole reported
                      </span>
                      <span className="font-body-sm text-label-sm text-secondary">Sector 4 • 2m ago</span>
                    </div>
                  </div>
                  <div className="px-space-md py-2.5 hover:bg-surface-container-low transition-colors flex items-start gap-space-xs cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"></span>
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-sm font-semibold text-on-surface">
                        Report PH-1042 verified
                      </span>
                      <span className="font-body-sm text-label-sm text-secondary">AI confidence 94% • 18m ago</span>
                    </div>
                  </div>
                  <div className="px-space-md py-2.5 hover:bg-surface-container-low transition-colors flex items-start gap-space-xs cursor-pointer">
                    <span className="w-2 h-2 rounded-full bg-tertiary mt-1.5 shrink-0"></span>
                    <div className="flex flex-col">
                      <span className="font-body-md text-body-sm font-semibold text-on-surface">
                        Report PH-1031 resolved
                      </span>
                      <span className="font-body-sm text-label-sm text-secondary">Road Crew Alpha • 1h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Menu */}
          <div className="relative" ref={userRef}>
            <button
              type="button"
              onClick={() => setShowUserMenu((prev) => !prev)}
              className="flex items-center gap-space-sm p-1.5 pl-2 rounded-full hover:bg-surface-container border border-outline-variant/30 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span className="material-symbols-outlined text-on-primary text-[18px]">person</span>
              </div>
              <div className="hidden md:flex flex-col text-left leading-tight pr-1">
                <span className="font-title-md text-label-md text-on-surface font-bold">Admin</span>
                <span className="font-label-sm text-[11px] text-secondary">Municipal DPW</span>
              </div>
              <span className="material-symbols-outlined text-[18px] text-outline pr-1">expand_more</span>
            </button>

            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant/30 py-space-sm z-50">
                <div className="px-space-md py-2 border-b border-outline-variant/20 md:hidden">
                  <p className="font-title-md text-label-md text-on-surface font-bold">Admin (Municipal DPW)</p>
                  <p className="font-body-sm text-label-sm text-secondary">admin.dpw@civic.gov</p>
                </div>
                <Link
                  href="/dashboard/settings"
                  className="flex items-center gap-space-sm px-space-md py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-title-md text-body-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">account_circle</span>
                  <span>Profile Settings</span>
                </Link>
                <Link
                  href="/admin/security"
                  className="flex items-center gap-space-sm px-space-md py-2 text-on-surface-variant hover:bg-surface-container hover:text-on-surface font-title-md text-body-sm transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                  <span>Security Logs</span>
                </Link>
                <div className="border-t border-outline-variant/20 my-1"></div>
                <button
                  type="button"
                  onClick={() => {
                    setShowUserMenu(false);
                    onOpenLogout();
                  }}
                  className="w-full flex items-center gap-space-sm px-space-md py-2 text-error hover:bg-error-container hover:text-on-error-container font-title-md text-body-sm transition-colors text-left"
                >
                  <span className="material-symbols-outlined text-[18px]">logout</span>
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
