import { useCallback } from "react";
import { useNavigate } from "react-router";

export interface ApiError {
  status?: number;
  message: string;
  data?: any;
}

/**
 * Hook for handling API errors in components
 * Works alongside global interceptors
 */
export function useApiError() {
  const navigate = useNavigate();

  const handleError = useCallback(
    (error: any, customHandlers?: Record<number, () => void>) => {
      const status = error.response?.status;
      const message = error.response?.data?.message || error.message;

      // Check for custom handler first
      if (customHandlers && customHandlers[status]) {
        customHandlers[status]();
        return;
      }

      // Handle standard errors
      switch (status) {
        case 400:
          console.warn("Bad request:", message);
          return { status: 400, message: "Invalid request" };

        case 401:
          console.warn("Unauthorized - redirecting to login");
          localStorage.removeItem("token");
          localStorage.removeItem("user");
          navigate("/login");
          return {
            status: 401,
            message: "Session expired. Please log in again.",
          };

        case 403:
          console.warn("Forbidden:", message);
          return {
            status: 403,
            message: "You don't have permission to access this resource",
          };

        case 404:
          console.warn("Not found:", message);
          return { status: 404, message: "Resource not found" };

        case 422:
          console.warn("Validation error:", message);
          return { status: 422, message: message || "Validation error" };

        case 500:
          console.error("Server error:", message);
          return {
            status: 500,
            message: "Server error. Please try again later.",
          };

        default:
          console.error("API Error:", message);
          return { status, message: message || "An error occurred" };
      }
    },
    [navigate],
  );

  return { handleError };
}
