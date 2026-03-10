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

        if (status === 401) {
            // Unauthorized - clear token and redirect to login
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.href = "/login";
        }

        if (status === 403) {
            // Forbidden - not authorized for this resource
            console.warn("Access Denied: You don't have permission to access this resource");
            alert("Access Denied: You don't have permission to access this resource");
        }

        if (status === 404) {
            // Not found
            console.warn("Resource not found");
        }

        if (status === 500) {
            // Server error
            console.error("Server error. Please try again later");
            alert("Server error. Please try again later");
        }

        return Promise.reject(error);
    }
);

export default api;

