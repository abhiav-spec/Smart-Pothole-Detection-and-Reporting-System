"use client";

export default function PipelinePreview() {
  return (
    <div className="lg:col-span-5 flex flex-col justify-between space-y-space-lg">
      <div className="flex flex-col space-y-space-md">
        {/* Badge Pill */}
        <div className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-primary-fixed text-on-primary-fixed shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
          <span className="font-label-sm text-label-sm uppercase tracking-wider font-bold">
            Citizen Reporter Network • Open Civic Data
          </span>
        </div>

        {/* Brand Statement Headline */}
        <div className="space-y-space-xs">
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight font-bold leading-tight">
            Smarter Roads Start With One Report.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant font-normal leading-relaxed pt-space-xs">
            Report potholes, detect road damage with AI, and help make streets safer for everyone.
          </p>
        </div>

        {/* Interactive Visual Mockup: 3-Step Detection Arc */}
        <div className="mt-space-md bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col space-y-space-md relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute -top-16 -right-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Header of visual card */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">
                radar
              </span>
              <span className="font-title-md text-title-md text-on-surface font-bold">
                Rapid Ingestion Pipeline
              </span>
            </div>
            <span className="font-label-sm text-label-sm bg-surface-container-high px-2.5 py-1 rounded-full text-primary font-semibold">
              v4.2 Vision Engine
            </span>
          </div>

          {/* Workflow Items */}
          <div className="grid grid-cols-1 gap-space-sm pt-space-xs">
            {/* Step 1 */}
            <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low transition-transform hover:translate-x-1 duration-200">
              <div className="w-9 h-9 rounded-lg bg-primary text-on-primary flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">videocam</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface text-[14px] leading-tight">
                  1. Instant Camera & Dashcam Capture
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  Zero latency frame extraction under direct sunlight or rain.
                </span>
              </div>
            </div>

            {/* Step 2: Highlighted with Mini Sensor Feed */}
            <div className="flex flex-col p-space-sm rounded-lg bg-surface-container transition-all">
              <div className="flex items-start gap-space-sm">
                <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary-container flex items-center justify-center shrink-0 shadow-sm">
                  <span className="material-symbols-outlined text-[20px]">view_in_ar</span>
                </div>
                <div className="flex flex-col flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-title-md text-title-md text-on-surface text-[14px] leading-tight">
                      2. Neural CV Segmentation
                    </span>
                    <span className="font-label-sm text-label-sm text-tertiary font-bold">
                      98.4% Confidence
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                    Dynamic depth estimation & volumetric asphalt analysis.
                  </span>
                </div>
              </div>

              {/* Bounding Box Micro Preview */}
              <div className="mt-space-sm rounded-lg overflow-hidden relative h-28 bg-surface-variant flex items-center justify-center">
                <img
                  className="w-full h-full object-cover"
                  alt="Close-up aerial asphalt roadway pavement with yellow hazard bounding box highlighting a deep surface fissure with telemetry HUD data overlays in crisp teal and white typography."
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1dl5s8vwPSy1JlZeYTtqXdv5smfEvR2ouJKr6vLmh1T4kIrg_w_A4NCHRnqjzrm9gwfN2fLlg39aPOmr36iIAK-4PbgMscIh1n5KhafCNBvobHkFVaiwCknCtiWbRIJ-QYfqfu2AUx42PYEgtiIhtPvaDFclRfTQ05uX3LLFI0JvHi-sewCr2QxWKF1Dh7wQyJapwmGw4o15_yqGnHeJSHZtocjIm-C_HvhhQB0t8PEcLhu5KKIOlYA"
                />
                <div className="absolute inset-0 bg-inverse-surface/30 backdrop-blur-[1px] flex items-center justify-center">
                  <div className="px-3 py-1.5 rounded-lg bg-surface/90 shadow-md backdrop-blur-md flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-error animate-pulse"></span>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                      Severe Crack • Depth: 4.8cm
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start gap-space-sm p-space-sm rounded-lg bg-surface-container-low transition-transform hover:translate-x-1 duration-200">
              <div className="w-9 h-9 rounded-lg bg-inverse-surface text-inverse-on-surface flex items-center justify-center shrink-0 shadow-sm">
                <span className="material-symbols-outlined text-[20px]">local_shipping</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface text-[14px] leading-tight">
                  3. DPW & City Council Dispatch
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant text-[12px]">
                  Auto-routed GPS coordinates directly into work-order queues.
                </span>
              </div>
            </div>
          </div>

          {/* Floating Preview Pill with Mini Map */}
          <div className="mt-space-xs p-space-sm bg-surface-container-lowest rounded-xl shadow-sm flex items-center gap-space-sm">
            <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 shadow-inner">
              <div
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAvz1Y3GZnZ1SsJeiiSPHOdH4jGPRz7Gn3-m3FWZ3hqj1dwWs27icS34pI-ZUnVFRaFzUIjIRExg9H6r9vEIQ2w_q-vWj39tn8a9Y_3jaFmk4gmLFNzyfzBYSirvQrBbAmwlG5_8bGyTz65Lcxq-RVqqSg6Trth-CH1sEW9tkceGNXUL_boAsqL_9S-rTMwx82rLXeBHpYIR6sk8HiX5iWlHipBh8IDEFf0-9BYQAGFQTyoFJ5BEkk9Eg')`
                }}
              ></div>
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-primary text-[16px]">
                  location_on
                </span>
                <span className="font-title-md text-title-md text-on-surface text-[13px] truncate">
                  14th St & Broadway Ave
                </span>
              </div>
              <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] truncate">
                Priority Queue: High (48h Resolution Target)
              </span>
            </div>
            <span className="material-symbols-outlined text-tertiary text-[20px] shrink-0">
              check_circle
            </span>
          </div>
        </div>

        {/* Bottom Micro Notice */}
        <div className="flex items-center gap-2 text-on-surface-variant pt-space-xs">
          <span className="material-symbols-outlined text-primary text-[18px]">
            verified
          </span>
          <span className="font-body-sm text-body-sm font-medium">
            AI-powered road reporting for safer communities.
          </span>
        </div>
      </div>
    </div>
  );
}
