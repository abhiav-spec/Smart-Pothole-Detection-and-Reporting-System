import React from "react";
import Link from "next/link";
import ExploreMap from "../../components/map/ExploreMap";

export default function ExploreMapPage() {
  return (
    <div className="bg-background font-body-md text-body-md text-on-surface antialiased min-h-screen flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/95 backdrop-blur-md border-b border-outline-variant/30">
        <div className="h-16 w-full max-w-[1440px] mx-auto px-gutter flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <img
              alt="PotholeAI Brand Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XKNBAMtNGMhPTpHLKXhEU3uIkv_70ocMEahxa9tDQqPHV1cJugpskGZeGusSFaNeSS2YS-TIG4U3NCNfv6_p_dvaijZX1K_NmE0w1emHf2AtLh6r2WrsN2gpz1Nyimf9WiKVHDUPlrLPTk1sma1tB0c9utMKaCLbehMEk1wuSC3wrp9_RQ8NYIRB_QdM-_93EoCavBKWL37uTOLJHZtttHk-Sp9KPlUWI0WFPw2uUxMUnCPQmnspN0kTw"
            />
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
              PotholeAI
            </span>
            <span className="hidden lg:inline-flex items-center px-space-xs py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider ml-space-xs">
              Civic Portal
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-space-xs p-1 bg-surface-container-low rounded-xl">
            <Link
              href="/dashboard"
              className="px-space-md py-space-xs rounded-lg font-label-md text-label-md text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface transition-all"
            >
              Home
            </Link>
            <Link
              href="/explore-map"
              className="px-space-md py-space-xs rounded-lg transition-all bg-primary-container text-on-primary-container font-label-md"
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
          <div className="flex items-center gap-space-md">
            <div className="relative group">
              <button
                className="flex items-center gap-space-sm py-1.5 px-2 rounded-xl hover:bg-surface-container-low transition-colors text-left focus:outline-none"
                type="button"
              >
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-primary text-[18px]">
                    person
                  </span>
                </div>
                <div className="hidden sm:flex flex-col">
                  <div className="flex items-center gap-space-xs">
                    <span className="font-label-md text-label-md text-on-surface leading-tight font-semibold">
                      Abhinav
                    </span>
                    <span className="material-symbols-outlined text-on-surface-variant text-[16px]">
                      expand_more
                    </span>
                  </div>
                  <span className="inline-flex items-center text-[10px] leading-3 font-semibold text-tertiary bg-tertiary-fixed/30 border border-tertiary/20 px-1.5 py-0.5 rounded-full mt-0.5">
                    Citizen Reporter
                  </span>
                </div>
              </button>
              <div className="absolute right-0 top-full mt-1 w-52 bg-surface-container-lowest border border-outline-variant/30 rounded-xl shadow-[0_4px_16px_rgba(15,23,42,0.08)] py-1.5 hidden group-hover:block z-50">
                <div className="px-space-md py-space-xs border-b border-outline-variant/20 sm:hidden">
                  <p className="font-label-md text-label-md text-on-surface font-semibold">
                    Abhinav
                  </p>
                  <span className="inline-flex items-center text-[10px] font-semibold text-tertiary bg-tertiary-fixed/30 px-1.5 py-0.5 rounded-full">
                    Citizen Reporter
                  </span>
                </div>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-space-sm px-space-md py-2 font-body-sm text-body-sm text-on-surface hover:bg-surface-container-low transition-colors"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-[18px]">
                    manage_accounts
                  </span>
                  My Account
                </Link>
                <div className="my-1 border-t border-outline-variant/20"></div>
                <Link
                  href="/login"
                  className="flex items-center gap-space-sm px-space-md py-2 font-body-sm text-body-sm text-error hover:bg-error-container/40 transition-colors"
                >
                  <span className="material-symbols-outlined text-error text-[18px]">
                    logout
                  </span>
                  Logout
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Map Content */}
      <ExploreMap />
      
      <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30 mt-auto">
        <div className="max-w-[1440px] mx-auto px-gutter py-space-lg flex flex-col sm:flex-row items-center justify-between gap-space-md">
          <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
            <span className="font-semibold text-on-surface">
              PotholeAI Civic Intelligence
            </span>
            <span>•</span>
            <span>Municipal Road Quality & Hazard System</span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2025 PotholeAI Portal. Dedicated to safer roadways.
          </p>
        </div>
      </footer>
    </div>
  );
}
