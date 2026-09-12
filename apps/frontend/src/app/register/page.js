import AuthPage from "@/components/auth/AuthPage";

export const metadata = {
  title: "Create Account — PotholeAI",
  description: "Join PotholeAI to report potholes and track road repairs in your neighborhood.",
};

export default function RegisterPage() {
  return <AuthPage initialMode="signup" />;
}
