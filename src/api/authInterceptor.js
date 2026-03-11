import api from "./axios";

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

// Response interceptor for global error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response?.status;
        const errorMessage = error.response?.data?.message || error.message;

        if (status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        if (status === 403) {
            // Forbidden - not authorized for this resource (silently handle)
            console.log("Access Denied: You don't have permission to access this resource");
            // Don't show alert, just log it - the app will handle gracefully
        }

        if (status === 404) {
            // Not found
            console.log("Resource not found:", errorMessage);
        }

        if (status === 500) {
            // Server error
            console.error("Server error:", errorMessage);
            alert(`Server error: ${errorMessage || "Please try again later"}`);
        }

        return Promise.reject(error);
    }
);

export default api;

