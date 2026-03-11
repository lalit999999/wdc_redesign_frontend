import { useNavigate } from "react-router";
import { PublicNavbar } from "../components/PublicNavbar";
import { UserPlus } from "lucide-react";
/// <reference types="vite/client" />

export function Register() {
  const navigate = useNavigate();

  const handleGoogleSignup = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/auth/google`;
  };

  const handleSignIn = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <PublicNavbar />

      <div className="flex-1 mt-10 flex">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 bg-gradient-to-br from-slate-900 to-slate-800">
          <div>
            <div className="inline-flex items-center gap-3 mb-12">
              <img
                src="https://res.cloudinary.com/dsmyka9cr/image/upload/v1770575382/nitplogo_je6ekp.png"
                alt="NITP Logo"
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-bold text-white">
                WDC Induction Portal
              </span>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl font-bold text-white leading-tight">
                Start Your
                <br />
                <span className="text-cyan-400">WDC Application</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Apply, complete assignments, track progress, and become part of
                the WDC developer community.
              </p>
            </div>
          </div>

          <div className="text-gray-400 text-sm">
            © 2026 WDC Induction Portal
          </div>
        </div>

        {/* Right Side - Registration Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold border border-cyan-500/30">
                <UserPlus className="w-3.5 h-3.5" />
                Create Profile
              </span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Create Account
              </h2>
              <p className="text-muted-foreground">
                Initialize your WDC Induction Profile
              </p>
            </div>

            {/* Google Signup Button */}
            <button
              onClick={handleGoogleSignup}
              className="w-full px-4 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center gap-3 mb-6"
            >
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Continue with Google
            </button>

            {/* Domain Restriction Warning */}
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <p className="text-sm text-yellow-600 dark:text-yellow-400">
                Restricted to <span className="font-semibold">@nitp.ac.in</span>{" "}
                domain
              </p>
            </div>

            {/* Sign In Link */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={handleSignIn}
                className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
