import React from 'react';
import Link from 'next/link';

export const metadata = {
  title: "Settings — PotholeAI",
  description: "Account and municipal platform settings.",
};

export default function SettingsPage() {
  return (
    <div className="bg-background min-h-screen flex flex-col font-body-md text-on-surface">
      <header className="bg-surface-container-lowest border-b border-outline-variant/30 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
            <span className="material-symbols-outlined text-[20px]">arrow_back</span>
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-xl font-bold text-on-surface">Account Settings</h1>
        </div>
      </header>
      
      <main className="max-w-4xl mx-auto w-full p-6 sm:p-10 space-y-8">
        <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20">
          <h2 className="text-lg font-semibold mb-4 border-b border-outline-variant/20 pb-2">Profile Information</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <div className="w-20 h-20 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center text-3xl font-bold">
              A
            </div>
            <div className="flex-1 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Full Name</label>
                  <input type="text" className="w-full h-11 px-4 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/40" defaultValue="Abhinav" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-on-surface-variant mb-1">Email Address</label>
                  <input type="email" className="w-full h-11 px-4 bg-surface-container-low rounded-xl border-none focus:ring-2 focus:ring-primary/40" defaultValue="abhinav@example.com" />
                </div>
              </div>
              <button className="px-5 py-2.5 bg-primary text-on-primary rounded-xl font-semibold shadow-sm hover:bg-primary/90 transition-colors">
                Save Changes
              </button>
            </div>
          </div>
        </section>

        <section className="bg-surface-container-lowest rounded-2xl p-6 shadow-sm border border-outline-variant/20">
          <h2 className="text-lg font-semibold mb-4 border-b border-outline-variant/20 pb-2">Notification Preferences</h2>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded text-primary focus:ring-primary" defaultChecked />
              <span className="text-on-surface">Email notifications for reported potholes</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded text-primary focus:ring-primary" defaultChecked />
              <span className="text-on-surface">Weekly community impact summary</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" className="w-5 h-5 rounded text-primary focus:ring-primary" />
              <span className="text-on-surface">SMS alerts for critical road hazards</span>
            </label>
          </div>
        </section>
      </main>
    </div>
  );
}
