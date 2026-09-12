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
  loading,
  error
}) {
  const isSignIn = mode === "signin";

  return (
    <div className="w-full lg:w-[55%] flex items-center justify-center p-gutter lg:p-space-xl bg-surface">
      <div className="w-full max-w-md bg-surface-container-lowest rounded-xl shadow-xl p-space-lg sm:p-space-xl flex flex-col gap-space-lg">
        {/* Header Section inside Auth Card */}
        <div className="flex flex-col items-center text-center gap-space-xs">
          <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary-container flex items-center justify-center shadow-sm">
            <span className="material-symbols-outlined text-[28px]">streetview</span>
          </div>
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold mt-space-xs">
            {isSignIn ? "Welcome back" : "Join the Civic Watch"}
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            {isSignIn
              ? "Sign in to continue reporting and tracking road issues."
              : "Create an account to start mapping and improving road safety."}
          </p>
        </div>

        {/* Segmented Tab Control */}
        <div className="w-full grid grid-cols-2 p-1 bg-surface-container-low rounded-lg gap-1">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`py-2 text-center rounded-md font-label-md text-label-md transition-all ${
              isSignIn
                ? "shadow-sm bg-surface-container-lowest text-primary font-semibold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`py-2 text-center rounded-md font-label-md text-label-md transition-all ${
              !isSignIn
                ? "shadow-sm bg-surface-container-lowest text-primary font-semibold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Error Notification Alert */}
        {error && (
          <div className="p-3 rounded-lg bg-error-container text-on-error-container text-body-sm font-medium flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{error}</span>
          </div>
        )}

        {/* Form Element */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-space-md">
          {/* Select Account Role */}
          <div className="flex flex-col gap-1.5" id="role-selector-group">
            <label className="font-label-md text-label-md text-on-surface font-semibold">
              Select Account Role
            </label>
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

          {/* Optional Name Field for Registration */}
          {!isSignIn && (
            <div className="flex flex-col gap-1.5">
              <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="fullName">
                Full name
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
                  badge
                </span>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required={!isSignIn}
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Jane Citizen"
                  className="w-full h-11 pl-10 pr-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline-variant"
                />
              </div>
            </div>
          )}

          {/* Email Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="email">
              Email address
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
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
                className="w-full h-11 pl-10 pr-3.5 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline-variant"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="flex flex-col gap-1.5">
            <label className="font-label-md text-label-md text-on-surface font-semibold" htmlFor="password">
              Password
            </label>
            <div className="relative flex items-center">
              <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
                lock
              </span>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-11 pl-10 pr-10 rounded-lg bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all placeholder:text-outline-variant"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
                className="absolute right-3 text-secondary hover:text-on-surface transition-colors flex items-center justify-center p-1"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Auxiliary Options Row (Sign In Mode) */}
          {isSignIn && (
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe || false}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-primary accent-primary bg-surface-container cursor-pointer"
                />
                <span className="font-body-sm text-body-sm text-on-surface-variant">Remember me</span>
              </label>
              <a href="#" className="font-label-md text-label-md text-primary hover:underline transition-colors">
                Forgot password?
              </a>
            </div>
          )}

          {/* Primary Submit CTA */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 mt-space-xs rounded-lg bg-primary text-on-primary font-label-md text-label-md font-semibold flex items-center justify-center gap-2 shadow-md hover:bg-primary-container active:scale-[0.99] transition-all disabled:opacity-50"
          >
            <span>{loading ? "Processing..." : isSignIn ? "Sign In" : "Create Account"}</span>
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </form>

        {/* Separation Line */}
        <div className="relative flex items-center justify-center">
          <div className="w-full h-[1px] bg-surface-container-high"></div>
          <span className="absolute px-3 bg-surface-container-lowest font-label-sm text-label-sm text-outline uppercase tracking-wider">
            OR
          </span>
        </div>

        {/* Toggle Mode Link */}
        <div className="flex items-center justify-center gap-1 font-body-sm text-body-sm text-on-surface-variant">
          <span>{isSignIn ? "Don't have an account?" : "Already have an account?"}</span>
          <button
            type="button"
            onClick={() => setMode(isSignIn ? "signup" : "signin")}
            className="font-label-md text-label-md text-primary font-semibold hover:underline"
          >
            {isSignIn ? "Create account" : "Sign in"}
          </button>
        </div>

        {/* Terms Notice */}
        <p className="font-body-sm text-body-sm text-center text-outline leading-tight">
          By continuing, you agree to our{" "}
          <a className="text-on-surface-variant hover:text-primary transition-colors underline" href="#">
            Terms of Service
          </a>{" "}
          and{" "}
          <a className="text-on-surface-variant hover:text-primary transition-colors underline" href="#">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}
