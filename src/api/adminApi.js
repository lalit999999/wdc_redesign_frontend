import api from "./authInterceptor";

export const getUsers = () => {
    return api.get("/users");
};

export const approveUser = (id) => {
    return api.patch(`/users/${id}/approve`);
};

export const rejectUser = (id) => {
    return api.patch(`/users/${id}/reject`);
};

export const createAssignment = (data) => {
    return api.post("/assignments", data);
};

export const deleteAssignment = (id) => {
    return api.delete(`/assignments/${id}`);
};

export const createAnnouncement = (data) => {
    return api.post("/announcements", data);
};

export const deleteAnnouncement = (id) => {
    return api.delete(`/announcements/${id}`);
};

export const createStudent = (data) => {
    return api.post("/users", data);
};

export const createMultipleStudents = (studentsData) => {
    return api.post("/users/bulk", studentsData);
};

export const getStudents = () => {
    return api.get("/users");
};
