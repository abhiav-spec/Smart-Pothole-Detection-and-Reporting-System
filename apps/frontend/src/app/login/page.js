import AuthPage from "@/components/auth/AuthPage";

export const metadata = {
  title: "Sign In — PotholeAI",
  description: "Sign in to PotholeAI to access your dashboard and track road repairs.",
};

export default function LoginPage() {
  return <AuthPage initialMode="signin" />;
}
