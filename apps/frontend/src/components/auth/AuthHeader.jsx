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
            src="https://lh3.googleusercontent.com/aida/AEtjO1XKNBAMtNGMhPTpHLKXhEU3uIkv_70ocMEahxa9tDQqPHV1cJugpskGZeGusSFaNeSS2YS-TIG4U3NCNfv6_p_dvaijZX1K_NmE0w1emHf2AtLh6r2WrsN2gpz1Nyimf9WiKVHDUPlrLPTk1sma1tB0c9utMKaCLbehMEk1wuSC3wrp9_RQ8NYIRB_QdM-_93EoCavBKWL37uTOLJHZtttHk-Sp9KPlUWI0WFPw2uUxMUnCPQmnspN0kTw"
          />
          <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
            PotholeAI
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-space-md">
          <Link
            href="/dashboard"
            className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Explore Map
          </Link>
          <Link
            href="/"
            className="font-label-md text-label-md text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Back to Home
          </Link>
        </nav>

        {/* User Profile Avatar Icon */}
        <div className="flex items-center gap-space-sm">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <span className="material-symbols-outlined text-on-primary text-[18px]">
              person
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
