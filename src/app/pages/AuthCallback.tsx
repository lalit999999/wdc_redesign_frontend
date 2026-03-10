import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

export function AuthCallback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Extract token and user from URL parameters
    const token = searchParams.get("token");
    const userStr = searchParams.get("user");

    if (token && userStr) {
      // Decode the user data if it's URL encoded
      const userData = JSON.parse(decodeURIComponent(userStr));

      // Check if we're in a popup window
      if (window.opener) {
        // Send auth data to parent window (Login page)
        window.opener.postMessage(
          {
            type: "OAUTH_SUCCESS",
            token,
            user: userData,
          },
          window.location.origin,
        );

        // Close the popup
        window.close();
      } else {
        // If not in popup, store and redirect normally
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(userData));

        // Determine redirect based on user role
        const redirectPath =
          userData.role === "admin" ? "/admin" : "/dashboard";

        // Redirect to appropriate dashboard
        navigate(redirectPath);
      }
    } else {
      // If no token/user data, redirect back to login
      console.error("No authentication data received");

      if (window.opener) {
        // Send error to parent window
        window.opener.postMessage(
          {
            type: "OAUTH_ERROR",
            message: "No authentication data received",
          },
          window.location.origin,
        );
        window.close();
      } else {
        navigate("/login");
      }
    }
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-500 mb-4"></div>
        <p className="text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  );
}
