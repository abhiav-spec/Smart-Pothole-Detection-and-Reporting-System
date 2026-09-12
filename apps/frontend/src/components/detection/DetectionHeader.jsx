"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function DetectionHeader() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const userName = user?.name || "Abhinav";
  const userInitials = userName.slice(0, 2).toUpperCase();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all shadow-sm">
      <div className="h-16 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <Link href="/dashboard" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-teal-500 flex items-center justify-center text-white shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">lens_blur</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-display font-bold text-xl tracking-tight text-slate-900">
              Pothole<span className="text-primary">AI</span>
            </span>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200 text-slate-600 font-display text-[10px] font-bold uppercase tracking-wider">
              Civic Care
            </span>
          </div>
        </Link>

        {/* 4 Citizen Tabs in Navigation */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {/* 1. Explore Map */}
          <Link
            href="/dashboard/map"
            className="px-3 sm:px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-display text-sm font-semibold transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[19px] text-slate-400">map</span>
            <span>Explore Map</span>
          </Link>

          {/* 2. Report Pothole (Active Highlighted) */}
          <Link
            href="/detect"
            className="px-3.5 sm:px-4 py-2 rounded-xl bg-primary text-white font-display text-sm font-semibold shadow-sm hover:bg-primary-container shadow-primary/20 transition-all flex items-center gap-1.5 ring-2 ring-primary/20"
          >
            <span className="material-symbols-outlined text-[19px]">add_a_photo</span>
            <span>Report Pothole</span>
          </Link>

          {/* 3. My Account */}
          <Link
            href="/dashboard/settings"
            className="px-3 sm:px-3.5 py-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-display text-sm font-semibold transition-all flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[19px] text-slate-400">person</span>
            <span>My Account</span>
          </Link>

          {/* 4. Logout */}
          <button
            type="button"
            onClick={handleLogout}
            className="px-2.5 sm:px-3 py-2 rounded-xl text-slate-500 hover:text-rose-600 hover:bg-rose-50 font-display text-sm font-semibold transition-all flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[19px]">logout</span>
            <span className="hidden sm:inline">Logout</span>
          </button>

          {/* User Profile Pill Indicator */}
          <div className="hidden lg:flex items-center gap-2 pl-3 ml-1 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-teal-50 border border-teal-200 text-primary flex items-center justify-center font-display font-bold text-xs">
              {userInitials}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-slate-900 leading-tight">
                {userName}
              </span>
              <span className="text-[10px] text-teal-700 font-medium">Citizen Reporter</span>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
