"use client";

import Link from "next/link";

export default function AuthHeader() {
  return (
    <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-16 w-full px-gutter flex items-center justify-between">
        {/* Brand Logo & Name */}
        <Link href="/" className="flex items-center gap-space-sm">
          <img
            alt="PotholeAI Brand Logo"
            className="h-8 w-auto object-contain"
            src="/images/logo.jpg"
          />
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
            PotholeAI
          </span>
        </Link>

        {/* Right Side Items: Navigation & Profile */}
        <div className="flex items-center gap-space-lg">
          <nav className="flex items-center">
            <Link
              href="/about"
              className="font-label-md text-label-md font-semibold text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-[18px]">info</span>
              About Us
            </Link>
          </nav>

          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
