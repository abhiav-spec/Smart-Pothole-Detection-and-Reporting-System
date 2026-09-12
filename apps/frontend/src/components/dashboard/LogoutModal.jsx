"use client";

import { useEffect } from "react";

export default function LogoutModal({ isOpen, onClose, onConfirm }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-200"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md mx-4 rounded-xl bg-surface-container-lowest p-space-lg shadow-xl flex flex-col gap-space-md transform scale-100 transition-transform duration-200"
      >
        <div className="flex items-center gap-space-sm">
          <div className="w-10 h-10 rounded-full bg-error-container/60 text-error flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">warning</span>
          </div>
          <div className="flex flex-col">
            <h3 className="font-title-md text-title-md text-on-surface font-bold">
              Confirm Sign Out
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Are you sure you want to logout of PotholeAI?
            </p>
          </div>
        </div>
        <p className="font-body-sm text-body-sm text-on-surface-variant">
          Your active submissions are securely stored on city municipal servers. You can log back in anytime to file new roadway reports.
        </p>
        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <button
            type="button"
            onClick={onClose}
            className="h-10 px-space-md rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-md text-label-md transition-colors font-semibold"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="inline-flex items-center justify-center h-10 px-space-lg rounded-lg bg-error hover:bg-on-error-container text-on-error font-label-md text-label-md transition-colors font-semibold"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
