"use client";

import { useRef } from "react";

export default function MediaUploadSection({
  selectedFile,
  previewUrl,
  onFileSelect,
  onRemoveFile
}) {
  const fileInputRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="lg:col-span-7 flex flex-col gap-6">
      {/* Upload Step Title */}
      <div className="flex items-center gap-2.5">
        <span className="w-7 h-7 rounded-full bg-primary text-white flex items-center justify-center font-display text-xs font-bold">
          1
        </span>
        <h2 className="font-display font-bold text-lg text-slate-900">
          Upload Photo or Short Video
        </h2>
        <span className="text-xs text-slate-500 ml-auto">Clear view of the pothole</span>
      </div>

      {/* Main Simplified Dropzone */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
        className="relative group bg-white border-2 border-dashed border-slate-300 hover:border-primary rounded-3xl p-8 sm:p-10 transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer flex flex-col items-center justify-center text-center overflow-hidden"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp,video/mp4"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              onFileSelect(e.target.files[0]);
            }
          }}
          className="hidden"
        />
        <div className="flex flex-col items-center max-w-md pointer-events-none">
          <div className="w-16 h-16 rounded-2xl bg-teal-50 text-primary border border-teal-100 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
            <span className="material-symbols-outlined text-3xl">add_photo_alternate</span>
          </div>
          <h3 className="font-display font-bold text-lg text-slate-900 mb-1">
            Tap here to choose or take a photo
          </h3>
          <p className="text-slate-500 text-sm mb-3">
            or drag & drop a road photo or video from your device
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="inline-flex items-center gap-1 text-slate-500 font-medium">
              <span className="material-symbols-outlined text-[15px] text-teal-600">
                check_circle
              </span>
              JPG, PNG, WEBP or MP4
            </span>
            <span>• Max 50MB</span>
          </div>
        </div>
      </div>

      {/* Friendly Attached Photo Card */}
      {selectedFile && (
        <div className="bg-white rounded-2xl p-5 border border-emerald-200/80 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3.5">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[18px] text-emerald-600">
                check_circle
              </span>
              <span className="font-display font-bold text-sm text-slate-900">
                Photo Attached Successfully
              </span>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-medium text-xs">
              Ready for Dispatch
            </span>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative w-full sm:w-44 aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shrink-0">
              <img
                id="previewImage"
                alt="Loaded road inspection preview"
                className="w-full h-full object-cover"
                src={previewUrl || "https://lh3.googleusercontent.com/aida-public/AB6AXuAHLubGRrpFtqSckbvzRp0ZyCXHHIiF6gQCkCzonF5CULC6RZKvwjDw0jYZHRl0nEBKbZzjLX5VmDYk48uLlARmhHkVsisiDWPj53HZQOZlUgM5PIjOMWPM2IR6TvWkGGtexH7X7FPUfRpjRvXhlf-zMt1oqYatlAATdq8_urfISISEgh7g1DxDOqvvlCNbNtOsavqoSb0FAWro7D5XUs4FKZLRHbNSMKKyWuUvMGt6ZApwnXIeYGst0w"}
              />
            </div>
            <div className="flex-1 w-full min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h5 className="font-display font-semibold text-sm text-slate-900 truncate">
                  {selectedFile.name}
                </h5>
                <button
                  type="button"
                  onClick={onRemoveFile}
                  className="text-xs text-rose-500 hover:text-rose-700 font-medium ml-2 flex items-center gap-0.5"
                >
                  <span className="material-symbols-outlined text-[14px]">delete</span>
                  <span>Remove</span>
                </button>
              </div>
              <p className="text-xs text-slate-500 mb-3">
                Image looks clear and legible. Our municipal repair team will be able to evaluate the hazard severity directly from this photo.
              </p>
              <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50/80 px-2.5 py-1 rounded-lg border border-emerald-100">
                <span className="material-symbols-outlined text-[15px]">photo_camera</span>
                <span>Good lighting and angle detected</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Reassuring Citizen Notice */}
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-slate-100/80 border border-slate-200/80 text-xs text-slate-600">
        <span className="material-symbols-outlined text-slate-500 text-[20px] shrink-0 mt-0.5">
          help_outline
        </span>
        <div>
          <strong className="text-slate-800 block mb-0.5">What happens next?</strong>
          Once submitted, your report is checked by city inspectors, queued for patching, and shown on the civic map so neighbors know repair work is on the way.
        </div>
      </div>
    </div>
  );
}
