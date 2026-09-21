"use client";

import { useState } from "react";
import AuthHeader from "./AuthHeader";
import PipelinePreview from "./PipelinePreview";
import AuthForm from "./AuthForm";
import AuthFooter from "./AuthFooter";

export default function AuthPage({ initialMode = "signin" }) {
  const [mode, setMode] = useState(initialMode);
  const [userRole, setUserRole] = useState("citizen");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup" && !formData.fullName.trim()) {
      setError("Please enter your full name.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (mode === "signup" && formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (mode === "signup" && !formData.termsAccepted) {
      setError("Please accept the Terms of Service and Civic Privacy Policy.");
      return;
    }

    setLoading(true);

    try {
      const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";
      const endpoint = mode === "signup" ? `${backendUrl}/auth/register` : `${backendUrl}/auth/login`;

      const payload =
        mode === "signup"
          ? {
              name: formData.fullName,
              email: formData.email,
              password: formData.password,
              role: userRole === "municipal" ? "AUTHORITY" : "USER"
            }
          : {
              email: formData.email,
              password: formData.password
            };

      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Authentication failed.");
      }

      if (data.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.data.user));
      }

      // Redirect to dashboard on successful login / registration
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <AuthHeader />
      <main className="w-full pt-16 bg-background min-h-screen">
        <div className="w-full max-w-[1440px] mx-auto px-gutter py-space-md lg:py-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg lg:gap-space-xl items-start">
            <PipelinePreview />
            <AuthForm
              mode={mode}
              setMode={setMode}
              userRole={userRole}
              setUserRole={setUserRole}
              formData={formData}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              loading={loading}
              error={error}
            />
          </div>
        </div>
      </main>
      <AuthFooter />
    </div>
  );
}
