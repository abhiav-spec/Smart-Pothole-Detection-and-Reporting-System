"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminSidebar({ onOpenLogout }) {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", path: "/admin/dashboard", icon: "grid_view" },
    { label: "Reports", path: "/dashboard/reports", icon: "assignment" },
    { label: "Map", path: "/dashboard/map", icon: "map" },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-64 bg-surface-container-lowest border-r border-outline-variant/30 flex flex-col justify-between z-40">
      <div className="flex flex-col">
        {/* Brand Header */}
        <div className="h-16 px-space-md flex items-center gap-space-sm border-b border-outline-variant/20">
          <img
            alt="PotholeAI Brand Logo"
            className="h-8 w-auto object-contain"
            src="/images/logo.jpg"
          />
          <div className="flex flex-col">
            <span className="font-title-md text-title-md text-on-surface font-bold tracking-tight leading-none">
              PotholeAI
            </span>
            <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider mt-0.5">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-space-md">
          <span className="px-space-sm font-label-sm text-label-sm text-secondary uppercase tracking-wider font-semibold">
            Municipal Ops
          </span>
          <nav className="mt-space-sm space-y-1 flex flex-col">
            {navItems.map((item) => {
              const isActive = pathname === item.path || (item.path === "/admin/dashboard" && pathname === "/admin");
              return (
                <Link
                  key={item.label}
                  href={item.path}
                  className={`flex items-center gap-space-sm px-space-md py-2.5 rounded-lg transition-colors font-title-md text-body-md ${
                    isActive
                      ? "bg-primary-container text-on-primary-container font-semibold"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Bottom Footer Actions */}
      <div className="p-space-md border-t border-outline-variant/20 flex flex-col gap-1">
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors font-title-md text-body-md"
        >
          <span className="material-symbols-outlined text-[20px]">manage_accounts</span>
          <span>Admin Account</span>
        </Link>
        <button
          type="button"
          onClick={onOpenLogout}
          className="w-full flex items-center gap-space-sm px-space-md py-2.5 rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-colors font-title-md text-body-md text-left"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
