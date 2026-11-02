"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LuUser, LuMail, LuLock, LuEye, LuEyeOff, LuMapPin, LuArrowRight, LuCircleAlert } from "react-icons/lu";
import AuthLeftBanner from "@/components/auth/AuthLeftBanner";
import PasswordStrengthIndicator from "@/components/auth/PasswordStrengthIndicator";
import { authClient } from "@/lib/auth-client";

const districts = [
  "Dhaka", "Chattogram", "Rajshahi", "Khulna", "Barishal", "Sylhet", "Rangpur", "Mymensingh",
  "Panchagarh", "Kurigram", "Satkhira", "Moulvibazar", "Sunamganj", "Cox's Bazar", "Bandarban",
  "Bogura", "Dinajpur", "Jessore", "Kushtia", "Comilla", "Noakhali", "Feni", "Tangail", "Gazipur"
];

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [district, setDistrict] = useState("Dhaka");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim()) {
      setError("Please provide your full legal or preferred name.");
      return;
    }

    if (!email.trim()) {
      setError("Please provide a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (!agreeTerms) {
      setError("You must agree to the Non-Partisan Civic Code of Conduct.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await authClient.signUp.email({
        name,
        email,
        password,
      });

      if (res.error) {
        setError(res.error.message || "Failed to create account. Please try again.");
        setIsLoading(false);
        return;
      }

      router.push("/events");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create account.");
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/events",
      });
    } catch {
      setError("Failed to sign in with Google.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-base-200/40 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        <div className="lg:col-span-6">
          <AuthLeftBanner
            quoteText="Whether planting tidal mangrove barriers in Satkhira or clearing Old Dhaka canal beds, verified volunteer rosters give everyday youth the power to act directly."
            author="Farhana Yasmin"
            authorRole="Community Health & Urban Resilience Lead"
          />
        </div>

        <div className="lg:col-span-6 bg-base-100 rounded-3xl border border-base-300 p-8 sm:p-12 shadow-sm space-y-6">
          <div className="space-y-2">
            <h1 className="font-serif text-3xl font-bold text-base-content tracking-tight">
              Create Your Account
            </h1>
            <p className="text-xs sm:text-sm text-base-content/70">
              Join verified neighborhood volunteer coalitions and lead direct social development operations in your home ward.
            </p>
          </div>

          {error && (
            <div className="alert alert-error text-xs font-semibold rounded-2xl flex items-center gap-2">
              <LuCircleAlert className="text-base shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <button
            onClick={handleGoogleSignUp}
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
            <span>Sign Up with Google</span>
          </button>

          <div className="flex items-center gap-4 text-xs text-base-content/50 uppercase tracking-widest font-semibold">
            <div className="h-px bg-base-300 flex-1"></div>
            <span>Or register with email</span>
            <div className="h-px bg-base-300 flex-1"></div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/50">
                  <LuUser className="text-base" />
                </div>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Asif Mahmud"
                  className="input input-bordered w-full pl-10 text-sm bg-base-200/40 rounded-xl"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    placeholder="volunteer@oikyo.org"
                    className="input input-bordered w-full pl-10 text-sm bg-base-200/40 rounded-xl"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                  Home District
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-base-content/50">
                    <LuMapPin className="text-base" />
                  </div>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="select select-bordered w-full pl-10 text-sm bg-base-200/40 rounded-xl"
                  >
                    {districts.map((d) => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div>
              <label className="label text-xs font-bold uppercase tracking-wider text-base-content/80">
                Create Password
              </label>
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

              <PasswordStrengthIndicator password={password} />
            </div>

            <div className="pt-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="checkbox checkbox-primary checkbox-xs rounded-md mt-0.5"
                />
                <span className="text-xs text-base-content/75 leading-relaxed font-medium">
                  I agree to the <strong className="text-base-content">Non-Partisan Civic Code of Conduct</strong> and declare that I will operate with 100% humanitarian neutrality.
                </span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn btn-primary w-full text-sm font-semibold shadow-xs flex items-center justify-center gap-2 rounded-xl h-11 mt-4"
            >
              <span>{isLoading ? "Creating Account..." : "Create Account & Join Coalitions"}</span>
              <LuArrowRight className="text-sm" />
            </button>
          </form>

          <div className="text-center border-t border-base-200 pt-5 text-xs text-base-content/70">
            <span>Already have an account? </span>
            <Link href="/signin" className="font-bold text-primary hover:underline">
              Sign in instead
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
