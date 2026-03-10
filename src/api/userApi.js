import api from "./authInterceptor";

export const getProfile = () => {
    return api.get("/users/profile");
};

export const updateProfile = (data) => {
    return api.put("/users/profile", data);
};

export const getApplicationStatus = () => {
    return api.get("/users/application-status");
};
