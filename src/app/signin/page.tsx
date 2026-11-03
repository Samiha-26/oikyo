"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuMail, LuLock, LuEye, LuEyeOff, LuArrowRight, LuCircleAlert } from "react-icons/lu";
import AuthLeftBanner from "@/components/auth/AuthLeftBanner";
import { authClient } from "@/lib/auth-client";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || "Invalid email or password.");
        setIsLoading(false);
        return;
      }

      router.push("/events");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      const res = await authClient.signIn.social({
        provider: "google",
        callbackURL: "/events",
      });
      if (res?.error) {
        setError(res.error.message || "Failed to sign in with Google.");
        setIsLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in with Google.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200/40 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-6">
          <AuthLeftBanner
            quoteText="In Panchagarh during the sub-10°C cold waves, Oikyo let our student brigade verify blanket allocations across 8 union parishads without overlapped relief packages."
            author="Tanvir Ahmed"
            authorRole="North Bengal Cold Dispatch Coordinator"
          />
        </div>

        <div className="lg:col-span-6 bg-base-100 rounded-3xl border border-base-300 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold text-base-content tracking-tight">
              Sign In to Oikyo
            </h1>
            <p className="text-xs sm:text-sm text-base-content/70">
              Access your field coordinator dashboard, manage community drives, and track your volunteer commitments.
            </p>
          </div>

          {error && (
            <div className="alert alert-error text-xs font-semibold rounded-2xl flex items-center gap-2">
              <LuCircleAlert className="text-base shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            type="button"
            className="btn btn-outline w-full rounded-2xl flex items-center justify-center gap-3 border-base-300 hover:bg-base-200 text-sm font-semibold h-12 shadow-2xs"
          >
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="flex items-center gap-4 text-xs text-base-content/50 uppercase tracking-widest font-semibold">
            <div className="h-px bg-base-300 flex-1"></div>
            <span>Or email</span>
            <div className="h-px bg-base-300 flex-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/50">
                  <LuMail className="text-base" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="organizer@community.org"
                  className="input input-bordered w-full pl-10 text-sm bg-base-200/40 rounded-xl"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-semibold text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/50">
                  <LuLock className="text-base" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 pr-10 text-sm bg-base-200/40 rounded-xl"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-base-content/50 hover:text-base-content"
                >
                  {showPassword ? <LuEyeOff className="text-base" /> : <LuEye className="text-base" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-xs rounded-md"
                />
                <span className="text-base-content/75 font-medium">Remember me for 30 days</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full text-sm font-semibold shadow-xs flex items-center justify-center gap-2 rounded-xl h-11 mt-2"
            >
              <span>{isLoading ? "Authenticating..." : "Sign In to Dispatch"}</span>
              <LuArrowRight className="text-sm" />
            </button>
          </form>

          <div className="text-center border-t border-base-200 pt-5 text-xs text-base-content/70">
            <span>New to grassroots mobilization? </span>
            <Link href="/signup" className="font-bold text-primary hover:underline">
              Create an account
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
