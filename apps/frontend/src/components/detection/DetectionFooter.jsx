"use client";

import Link from "next/link";

export default function DetectionFooter() {
  return (
    <footer className="w-full bg-white border-t border-slate-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center">
            <span className="material-symbols-outlined text-[15px]">lens_blur</span>
          </div>
          <span className="font-display font-bold text-sm text-slate-800">PotholeAI</span>
          <span className="text-slate-400 text-xs">• Connected Civic Maintenance</span>
        </div>
        <div className="flex items-center gap-6 text-xs text-slate-500">
          <Link href="/dashboard/map" className="hover:text-primary transition-colors">
            Explore Map
          </Link>
          <Link href="/dashboard" className="hover:text-primary transition-colors">
            Public Works Portal
          </Link>
          <Link href="#" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <span>© 2025 PotholeAI</span>
        </div>
      </div>
    </footer>
  );
}
