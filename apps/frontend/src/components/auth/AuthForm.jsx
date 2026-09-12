"use client";

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
  showConfirmPassword,
  setShowConfirmPassword,
  loading,
  error
}) {
  const isSignup = mode === "signup";

  return (
    <div className="lg:col-span-7 flex justify-center w-full">
      <div className="w-full max-w-xl bg-surface-container-lowest rounded-xl shadow-xl p-6 sm:p-space-lg flex flex-col space-y-space-md">
        {/* Card Header & Icon */}
        <div className="flex flex-col items-center text-center space-y-space-xs">
          <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-md">
            <span className="material-symbols-outlined text-[28px]">add_road</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
            {isSignup ? "Join PotholeAI" : "Welcome Back to PotholeAI"}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            {isSignup
              ? "Create an account to start reporting hazards and tracking repairs in your neighborhood."
              : "Sign in to access your reporter dashboard and track active road repairs."}
          </p>
        </div>

        {/* Dual Tab Switcher */}
        <div className="grid grid-cols-2 p-1 bg-surface-container-high rounded-xl gap-1">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`py-2.5 rounded-lg font-label-md text-label-md font-semibold transition-all ${
              !isSignup
                ? "bg-surface-container-lowest text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`py-2.5 rounded-lg font-label-md text-label-md font-semibold transition-all ${
              isSignup
                ? "bg-surface-container-lowest text-primary shadow-sm"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-3 rounded-lg bg-error-container text-on-error-container text-body-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-space-md">
          <div className="flex flex-col space-y-space-sm">
            {/* Account Role Selector (Signup Mode) */}
            {isSignup && (
              <div className="flex flex-col space-y-1">
                <label className="font-label-md text-label-md text-on-surface font-semibold">
                  Select Account Role
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-surface-container-high rounded-xl">
                  <label
                    onClick={() => setUserRole("citizen")}
                    className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg font-label-md text-label-md font-semibold cursor-pointer transition-all ${
                      userRole === "citizen"
                        ? "bg-surface-container-lowest text-primary shadow-sm border border-primary/20"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <input
                      type="radio"
                      name="userRole"
                      value="citizen"
                      checked={userRole === "citizen"}
                      onChange={() => setUserRole("citizen")}
                      className="hidden"
                    />
                    <span className="material-symbols-outlined text-[18px]">person</span>
                    <span>Citizen Reporter</span>
                  </label>

                  <label
                    onClick={() => setUserRole("municipal")}
                    className={`flex items-center justify-center gap-2 py-2 px-2.5 rounded-lg font-label-md text-label-md font-semibold cursor-pointer transition-all ${
                      userRole === "municipal"
                        ? "bg-surface-container-lowest text-primary shadow-sm border border-primary/20"
                        : "text-on-surface-variant hover:text-on-surface"
                    }`}
                  >
                    <input
                      type="radio"
                      name="userRole"
                      value="municipal"
                      checked={userRole === "municipal"}
                      onChange={() => setUserRole("municipal")}
                      className="hidden"
                    />
                    <span className="material-symbols-outlined text-[18px]">
                      location_city
                    </span>
                    <span>Municipal Admin</span>
                  </label>
                </div>
                <span className="font-body-sm text-body-sm text-outline text-[12px] pt-0.5">
                  Municipal accounts require civic email verification (.gov or municipal domain)
                </span>
              </div>
            )}

            {/* Full Name Field (Signup Only) */}
            {isSignup && (
              <div className="flex flex-col space-y-1">
                <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="fullName">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                    person
                  </span>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required={isSignup}
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:shadow-md transition-all placeholder:text-outline-variant"
                  />
                </div>
              </div>
            )}

            {/* Email Address Field */}
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">
                Email Address
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                  mail
                </span>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full h-11 pl-10 pr-3 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:shadow-md transition-all placeholder:text-outline-variant"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col space-y-1">
              <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">
                Password
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                  lock
                </span>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={isSignup ? "Create a password (min. 8 characters)" : "Enter your password"}
                  className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:shadow-md transition-all placeholder:text-outline-variant"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
              {isSignup && (
                <span className="font-body-sm text-body-sm text-outline text-[12px] pt-0.5">
                  Must be at least 8 characters with letters & numbers
                </span>
              )}
            </div>

            {/* Confirm Password Field (Signup Only) */}
            {isSignup && (
              <div className="flex flex-col space-y-1">
                <label
                  className="font-label-md text-label-md text-on-surface font-semibold"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-on-surface-variant text-[20px] pointer-events-none">
                    lock_clock
                  </span>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    required={isSignup}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                    className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-low text-on-surface font-body-md text-body-md focus:bg-surface-container-lowest focus:outline-none focus:shadow-md transition-all placeholder:text-outline-variant"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {showConfirmPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Terms Checkbox (Signup Only) */}
            {isSignup && (
              <div className="flex items-start gap-2 pt-space-xs">
                <input
                  id="termsCheck"
                  name="termsCheck"
                  type="checkbox"
                  checked={formData.termsCheck}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded text-primary focus:ring-0 accent-primary cursor-pointer"
                />
                <label
                  htmlFor="termsCheck"
                  className="font-body-sm text-body-sm text-on-surface-variant select-none cursor-pointer"
                >
                  I agree to the{" "}
                  <a href="#" className="text-primary hover:underline font-semibold">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-primary hover:underline font-semibold">
                    Civic Privacy Policy
                  </a>
                  .
                </label>
              </div>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-primary-container text-on-primary font-headline-sm text-headline-sm rounded-lg shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 font-semibold disabled:opacity-50"
          >
            <span>{loading ? "Processing..." : isSignup ? "Create Account" : "Sign In"}</span>
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-space-sm py-space-xs">
            <div className="flex-1 h-[1px] bg-surface-variant"></div>
            <span className="font-label-sm text-label-sm text-outline uppercase font-semibold">
              OR
            </span>
            <div className="flex-1 h-[1px] bg-surface-variant"></div>
          </div>

          {/* Mode Switch Prompt */}
          <div className="text-center pt-space-xs">
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {isSignup ? "Already have an account?" : "Don't have an account?"}
              <button
                type="button"
                onClick={() => setMode(isSignup ? "signin" : "signup")}
                className="text-primary hover:underline font-semibold ml-1"
              >
                {isSignup ? "Sign in" : "Create an account"}
              </button>
            </span>
          </div>
        </form>

        {/* Municipal Privacy Standard Tagline */}
        <div className="pt-space-xs flex items-center justify-center gap-1.5 text-outline">
          <span className="material-symbols-outlined text-[16px]">lock_person</span>
          <span className="font-body-sm text-body-sm text-[12px] text-center">
            Protected by end-to-end civic data encryption & municipal privacy standards.
          </span>
        </div>
      </div>
    </div>
  );
}
