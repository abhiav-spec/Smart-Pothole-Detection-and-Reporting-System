"use client";

export default function PipelinePreview() {
  return (
    <div className="w-full lg:w-[45%] bg-surface-container-low p-gutter lg:p-space-xl flex flex-col justify-between relative overflow-hidden rounded-xl lg:rounded-r-none">
      {/* Ambient Glow Decorators */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-0 w-80 h-80 rounded-full bg-secondary-fixed/30 blur-2xl pointer-events-none"></div>

      {/* Top Header & Brand Message */}
      <div className="relative z-10 flex flex-col gap-space-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-sm">
            <img
              alt="PotholeAI Municipal Identifier"
              className="w-9 h-9 rounded-lg object-contain bg-primary-container p-1 shadow-sm"
              src="https://lh3.googleusercontent.com/aida/AEtjO1XKNBAMtNGMhPTpHLKXhEU3uIkv_70ocMEahxa9tDQqPHV1cJugpskGZeGusSFaNeSS2YS-TIG4U3NCNfv6_p_dvaijZX1K_NmE0w1emHf2AtLh6r2WrsN2gpz1Nyimf9WiKVHDUPlrLPTk1sma1tB0c9utMKaCLbehMEk1wuSC3wrp9_RQ8NYIRB_QdM-_93EoCavBKWL37uTOLJHZtttHk-Sp9KPlUWI0WFPw2uUxMUnCPQmnspN0kTw"
            />
            <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
              PotholeAI
            </span>
          </div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest shadow-sm text-primary font-label-sm text-label-sm">
            <span className="w-2 h-2 rounded-full bg-primary animate-ping"></span>
            <span className="w-1.5 h-1.5 rounded-full bg-primary -ml-2.5"></span>
            <span>Civic Vision AI v2.4 • Active Detection</span>
          </div>
        </div>

        <div className="flex flex-col gap-space-sm mt-space-md">
          <h1 className="font-display-lg text-display-lg text-on-surface font-bold tracking-tight leading-tight">
            Smarter Roads Start With One Report.
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
            Report potholes, detect road damage with AI, and help make streets safer for everyone.
          </p>
        </div>
      </div>

      {/* AI Edge Detection Road Canvas Mockup */}
      <div className="relative z-10 my-space-lg">
        <div className="relative w-full rounded-xl overflow-hidden shadow-xl bg-surface-container-lowest p-space-md flex flex-col gap-space-sm">
          {/* Mockup Viewport Display */}
          <div className="relative w-full h-72 rounded-lg overflow-hidden bg-slate-900 flex items-center justify-center">
            <img
              className="w-full h-full object-cover opacity-85"
              alt="Asphalt roadway viewed from elevated dash camera perspective showing coarse textured pavement, lane markers, crisp daylight lighting with subtle road wear, perfectly framed for machine vision object detection overlays with deep teal and slate road ambiance."
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaeNUkUqvBtaiQpWkWcAyN3W5m-nqVM4_15CPMJpLu0z2qW6I-RmNyQbtw3-8bwuqtwSRikl7tbs10XnRTCqDX3AlPELf5WZeEPhvauohTYXdGDrfgXtMZgj4dSF59OjuKT3RfAuyFLMM44C710KJvcKoZ2FcJpX4zsBrtCL_DiK1GfHy2tkg9LsG79nN4e9FAhIZJOYCcpZvH74YUQYEvx8-m-5D_dsJli2-xwgyvWo_Gw-BRSzvctw"
            />
            {/* AI HUD Bounding Box Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-900/30"></div>

            {/* Bounding Box Targeting Frame */}
            <div className="absolute inset-x-12 top-14 bottom-16 rounded-lg pointer-events-none flex flex-col justify-between p-2 shadow-[0_0_0_2px_rgba(13,148,136,0.9)] bg-primary/10 backdrop-blur-[1px]">
              <div className="flex items-center justify-between">
                {/* Target Reticles */}
                <div className="flex items-center gap-1 text-primary-fixed text-label-sm font-label-sm uppercase tracking-wider">
                  <span className="material-symbols-outlined text-[16px]">
                    filter_center_focus
                  </span>
                  <span>DETECTION #8492</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold">
                  98.4% Match
                </span>
              </div>

              {/* Reticle Target Center */}
              <div className="self-center flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border border-primary-fixed/60 border-dashed animate-[spin_8s_linear_infinite] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-fixed"></div>
                </div>
              </div>

              {/* Realtime Metrics Tag */}
              <div className="bg-surface-container-lowest/95 backdrop-blur-md rounded px-2.5 py-1.5 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-error"></span>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    Pothole Detected
                  </span>
                </div>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Depth 3.4 in • High Rim Severity
                </span>
              </div>
            </div>

            {/* Live Edge Coordinates Tag */}
            <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-sm px-2 py-1 rounded text-primary-fixed font-label-sm text-label-sm flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">sensors</span>
              <span>LIDAR + OPTICAL SYNC</span>
            </div>
          </div>

          {/* Bottom Telemetry Card Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-xs pt-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container">
                <span className="material-symbols-outlined text-[18px]">near_me</span>
              </div>
              <div className="flex flex-col">
                <span className="font-title-md text-title-md text-on-surface leading-tight">
                  Oakridge Way & 4th
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant font-mono">
                  37.7749° N, 122.4194° W
                </span>
              </div>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-sm text-label-sm self-start sm:self-center">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              <span>Auto-synced with DPW Road Index</span>
            </div>
          </div>
        </div>
      </div>

      {/* Left Bottom Slogan */}
      <div className="relative z-10 flex items-center gap-2 text-on-surface-variant font-body-sm text-body-sm pt-space-sm">
        <span className="material-symbols-outlined text-primary text-[18px]">
          shield_with_heart
        </span>
        <span>AI-powered road reporting for safer communities.</span>
      </div>
    </div>
  );
}
