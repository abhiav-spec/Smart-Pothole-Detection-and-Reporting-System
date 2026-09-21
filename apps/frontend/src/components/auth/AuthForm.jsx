"use client";

import { useState } from "react";

export default function AuthForm({
  mode,
  setMode,
  userRole,
  setUserRole,
  formData,
  handleChange,
  handleSubmit,
  showPassword,
  setShowPassword,
  loading,
  error
}) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const isSignIn = mode === "signin";
  const fieldClass =
    "w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:shadow-md transition-all placeholder:text-outline-variant";
  const tabClass = (active) =>
    `py-2.5 rounded-lg font-label-md text-label-md font-semibold transition-all ${
      active
        ? "bg-surface-container-lowest text-primary shadow-sm"
        : "text-on-surface-variant hover:text-on-surface"
    }`;

  return (
    <div className="lg:col-span-7 flex justify-center w-full">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-xl shadow-xl p-6 sm:p-space-lg flex flex-col space-y-space-md">
        <div className="flex flex-col items-center text-center space-y-space-xs">
          <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[28px]">add_road</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
            {isSignIn ? "Welcome back" : "Join PotholeAI"}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            {isSignIn
              ? "Sign in to report hazards and track repairs in your neighborhood."
              : "Create an account to start reporting hazards and tracking repairs in your neighborhood."}
          </p>
        </div>

        <div className="grid grid-cols-2 p-1 bg-surface-container-high rounded-xl gap-1">
          <button type="button" onClick={() => setMode("signin")} className={tabClass(isSignIn)}>
            Sign In
          </button>
          <button type="button" onClick={() => setMode("signup")} className={tabClass(!isSignIn)}>
            Create Account
          </button>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-error-container text-on-error-container text-body-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col space-y-space-md">
          <div className="flex flex-col space-y-space-sm">
            <div className="flex flex-col space-y-1" id="role-selector-group">
              <label className="font-label-md text-label-md text-on-surface font-semibold">Select Account Role</label>
              <div className="grid grid-cols-2 gap-2 p-1 bg-surface-container-high rounded-xl">
                <button
                  type="button"
                  onClick={() => setUserRole("citizen")}
                  className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg font-label-md text-label-md font-semibold cursor-pointer transition-all ${
                    userRole === "citizen"
                      ? "bg-surface-container-lowest text-primary shadow-sm border border-primary/20"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">person</span>
                  <span>Citizen Reporter</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserRole("municipal")}
                  className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg font-label-md text-label-md font-semibold cursor-pointer transition-all ${
                    userRole === "municipal"
                      ? "bg-surface-container-lowest text-primary shadow-sm border border-primary/20"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">location_city</span>
                  <span>Municipal Admin</span>
                </button>
              </div>
              <span className="font-body-sm text-body-sm text-outline text-[12px] pt-0.5">
                Municipal accounts require civic email verification (.gov or municipal domain)
              </span>
            </div>

            {!isSignIn && (
              <div className="flex flex-col space-y-1">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="fullName">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">person</span>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={fieldClass.replace("pr-10", "pr-3")}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">mail</span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className={fieldClass.replace("pr-10", "pr-3")}
                />
              </div>
            </div>

            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">lock</span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isSignIn ? "Enter your password" : "Create a password (min. 8 characters)"}
                  className={fieldClass}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                  className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1"
                >
                  <span className="material-symbols-outlined text-[18px]">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
              {!isSignIn && (
                <span className="font-body-sm text-body-sm text-outline text-[12px] pt-0.5">
                  Must be at least 8 characters with letters and numbers
                </span>
              )}
            </div>

            {!isSignIn && (
              <>
                <div className="flex flex-col space-y-1">
                  <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="confirmPassword">
                    Confirm Password
                  </label>
                  <div className="relative flex items-center">
                    <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">lock_clock</span>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmation ? "text" : "password"}
                      required
                      value={formData.confirmPassword || ""}
                      onChange={handleChange}
                      placeholder="Confirm your password"
                      className={fieldClass}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmation(!showConfirmation)}
                      aria-label="Toggle confirmation password visibility"
                      className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1"
                    >
                      <span className="material-symbols-outlined text-[18px]">{showConfirmation ? "visibility_off" : "visibility"}</span>
                    </button>
                  </div>
                </div>
                <div className="flex items-start gap-2 pt-space-xs">
                  <input
                    id="termsAccepted"
                    name="termsAccepted"
                    type="checkbox"
                    required
                    checked={formData.termsAccepted || false}
                    onChange={handleChange}
                    className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                  />
                  <label className="font-body-sm text-body-sm text-on-surface-variant select-none cursor-pointer" htmlFor="termsAccepted">
                    I agree to the <a className="text-primary hover:underline font-semibold" href="#">Terms of Service</a> and{" "}
                    <a className="text-primary hover:underline font-semibold" href="#">Civic Privacy Policy</a>.
                  </label>
                </div>
              </>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-60"
          >
            <span>{loading ? "Processing..." : isSignIn ? "Sign In" : "Create Account"}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>

          <div className="flex items-center gap-space-sm py-space-xs">
            <div className="flex-1 h-px bg-surface-variant" />
            <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">OR</span>
            <div className="flex-1 h-px bg-surface-variant" />
          </div>

          <div className="text-center pt-space-xs">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
              <button type="button" onClick={() => setMode(isSignIn ? "signup" : "signin")} className="text-primary hover:underline font-semibold ml-1">
                {isSignIn ? "Create an account" : "Sign in"}
              </button>
            </span>
          </div>
        </form>

        <div className="pt-space-xs flex items-center justify-center gap-1.5 text-outline">
          <span className="material-symbols-outlined text-[16px]">lock_person</span>
          <span className="font-body-sm text-body-sm text-[12px] text-center">
            Protected by end-to-end civic data encryption and municipal privacy standards.
          </span>
        </div>
      </div>
    </div>
  );
}
