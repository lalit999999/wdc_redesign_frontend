import api from "./authInterceptor";

export const getAnnouncements = () => {
    return api.get("/announcements");
};
