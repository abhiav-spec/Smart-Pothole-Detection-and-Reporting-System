import Link from "next/link";
import AuthHeader from "@/components/auth/AuthHeader";
import AuthFooter from "@/components/auth/AuthFooter";

export const metadata = {
  title: "About PotholeAI — Smarter Roads Start With One Report",
  description: "Learn about PotholeAI, our mission to improve civic infrastructure, and how we use AI to make roads safer for everyone.",
};

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AuthHeader />
      
      <main className="w-full pt-24 pb-16 bg-background flex-1">
        <div className="max-w-[800px] mx-auto px-gutter flex flex-col gap-space-xl">
          
          <section className="text-center flex flex-col items-center gap-space-sm">
            <img
              alt="PotholeAI Brand Logo"
              className="w-16 h-16 object-contain mb-2 rounded-xl shadow-sm"
              src="/images/logo.jpg"
            />
            <h1 className="font-display text-4xl sm:text-5xl font-bold text-slate-900 tracking-tight">
              About Pothole<span className="text-primary">AI</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mt-2">
              Empowering citizens and municipal authorities to collaborate on building safer, smoother, and smarter road networks.
            </p>
          </section>

          <section className="bg-surface-container-lowest rounded-2xl p-8 shadow-sm border border-slate-100 flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">target</span>
                Our Mission
              </h2>
              <p className="text-slate-600 leading-relaxed">
                PotholeAI was created with a simple but powerful goal: to bridge the gap between citizens who experience road hazards and the municipal authorities responsible for fixing them. We believe that safe roads are a fundamental civic right, and that AI can dramatically speed up the repair process.
              </p>
            </div>

            <div className="h-px bg-slate-100 w-full my-2"></div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-secondary">psychology</span>
                How It Works
              </h2>
              <div className="grid sm:grid-cols-2 gap-6 mt-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 font-bold">1</div>
                  <div>
                    <h3 className="font-bold text-slate-900">Citizens Report</h3>
                    <p className="text-sm text-slate-600 mt-1">Users easily capture and submit photos of road hazards through our intuitive platform.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 font-bold">2</div>
                  <div>
                    <h3 className="font-bold text-slate-900">AI Analyzes</h3>
                    <p className="text-sm text-slate-600 mt-1">Our advanced AI model instantly assesses the image, determining pothole severity and confidence.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 font-bold">3</div>
                  <div>
                    <h3 className="font-bold text-slate-900">Smart Dispatching</h3>
                    <p className="text-sm text-slate-600 mt-1">Critical hazards are automatically prioritized and routed to the correct municipal authority.</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 font-bold">4</div>
                  <div>
                    <h3 className="font-bold text-slate-900">Real-time Tracking</h3>
                    <p className="text-sm text-slate-600 mt-1">Citizens receive updates on their reports as work orders progress from "Reported" to "Resolved".</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="h-px bg-slate-100 w-full my-2"></div>

            <div>
              <h2 className="text-2xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary">security</span>
                Trust & Transparency
              </h2>
              <p className="text-slate-600 leading-relaxed">
                All data is encrypted end-to-end to protect citizen privacy. Municipal admins utilize a specialized dashboard to manage civic resources efficiently, ensuring taxpayer money is spent on the most critical infrastructural repairs first. 
              </p>
            </div>
          </section>

          <div className="flex justify-center mt-4">
            <Link 
              href="/login" 
              className="px-8 py-3 bg-primary hover:bg-primary-container text-white font-bold rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              Join the Platform Today
              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
            </Link>
          </div>

        </div>
      </main>

      <AuthFooter />
    </div>
  );
}
