"use client";

import Link from "next/link";

export default function AuthFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest shadow-[0_1px_8px_rgba(0,0,0,0.04)] py-space-md mt-auto">
      <div className="w-full px-gutter flex flex-col sm:flex-row items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs text-on-surface-variant font-body-sm text-body-sm">
          <span className="font-title-md text-title-md text-primary font-bold">
            PotholeAI
          </span>
          <span>© 2025 Municipal Intelligence Platform.</span>
        </div>
        <div className="flex items-center gap-space-md font-body-sm text-body-sm text-on-surface-variant">
          <Link href="#" className="hover:text-on-surface transition-colors">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-on-surface transition-colors">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-on-surface transition-colors">
            Civic Access
          </Link>
        </div>
      </div>
    </footer>
  );
}
