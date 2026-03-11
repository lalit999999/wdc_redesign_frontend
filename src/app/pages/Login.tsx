/// <reference types="vite/client" />

import { useNavigate } from "react-router";
import { useEffect } from "react";
import { PublicNavbar } from "../components/PublicNavbar";
import { LogIn } from "lucide-react";

export function Login() {
  const navigate = useNavigate();

  // Listen for messages from OAuth popup
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Verify origin for security
      if (event.origin !== window.location.origin) return;

      // Handle successful auth
      if (event.data.type === "OAUTH_SUCCESS") {
        const { token, user } = event.data;
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Redirect based on role
        if (user.role === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }

      // Handle auth error
      if (event.data.type === "OAUTH_ERROR") {
        alert(`Authentication failed: ${event.data.message}`);
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [navigate]);

  const handleGoogleLogin = () => {
    const width = 500;
    const height = 600;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    // Open Google OAuth in a popup
    const popup = window.open(
      `${import.meta.env.VITE_API_BASE_URL}/auth/google`,
      "Google Login",
      `width=${width},height=${height},left=${left},top=${top}`,
    );

    if (!popup) {
      alert("Popup blocked! Please enable popups for this site.");
    }
  };

  const handleRegister = () => {
    navigate("/register");
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
                Welcome Back to
                <br />
                <span className="text-cyan-400">Your WDC Journey</span>
              </h1>
              <p className="text-gray-300 text-lg leading-relaxed max-w-md">
                Track your application, submit assignments, and collaborate with
                mentors — all from a single dashboard.
              </p>
            </div>
          </div>

          <div className="text-gray-400 text-sm">
            © 2026 WDC Induction Portal. System Secure using OAuth 2.0.
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-6">
          <div className="w-full max-w-md">
            {/* Badge */}
            <div className="mb-8">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-semibold border border-cyan-500/30">
                <LogIn className="w-3.5 h-3.5" />
                Auth Node Access
              </span>
            </div>

            {/* Header */}
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-2">
                Sign In
              </h2>
              <p className="text-muted-foreground">
                Authenticate to access the portal
              </p>
            </div>

            {/* Google Login Button */}
            <button
              onClick={handleGoogleLogin}
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

            {/* Registration Link */}
            <div className="mt-6 text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <button
                onClick={handleRegister}
                className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors"
              >
                Initialize Registration
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
