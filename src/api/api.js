import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true,
});

export const getAnnouncements = () => API.get("/announcements");

export const getProfile = (token) =>
    API.get("/users/profile", {
        headers: { Authorization: `Bearer ${token}` },
    });

export const updateProfile = (data, token) =>
    API.put("/users/profile", data, {
        headers: { Authorization: `Bearer ${token}` },
    });

export const getAssignments = (token) =>
    API.get("/assignments", {
        headers: { Authorization: `Bearer ${token}` },
    });

export default API;
