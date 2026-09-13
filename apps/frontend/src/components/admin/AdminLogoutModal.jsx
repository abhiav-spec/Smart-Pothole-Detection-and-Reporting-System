"use client";

import { useRouter } from "next/navigation";

export default function AdminLogoutModal({ isOpen, onClose }) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleConfirmLogout = () => {
    // Clear auth session token if stored in localStorage/cookies
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    onClose();
    router.push("/login");
  };

  return (
    <div
      className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-50 flex items-center justify-center p-margin-mobile"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-surface-container-lowest rounded-xl border border-outline-variant/40 shadow-xl max-w-md w-full p-space-lg flex flex-col gap-space-md animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-center gap-space-sm text-error">
          <div className="w-10 h-10 rounded-full bg-error-container flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[24px] text-on-error-container">warning</span>
          </div>
          <div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Confirm Sign Out</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
              Are you sure you want to end your active administrative session?
            </p>
          </div>
        </div>
        <div className="flex items-center justify-end gap-space-sm pt-space-sm border-t border-outline-variant/20">
          <button
            type="button"
            onClick={onClose}
            className="px-space-md py-2 rounded-lg border border-outline text-on-surface hover:bg-surface-container transition-colors font-title-md text-body-sm"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleConfirmLogout}
            className="px-space-md py-2 rounded-lg bg-error text-on-error hover:opacity-90 transition-opacity font-title-md text-body-sm font-semibold"
          >
            Confirm Logout
          </button>
        </div>
      </div>
    </div>
  );
}
