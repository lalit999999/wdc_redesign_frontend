import api from "./authInterceptor";

export const getAssignments = () => {
    return api.get("/assignments");
};

export const getSubmissions = () => {
    return api.get("/submissions");
};

export const submitAssignment = (id, data) => {
    return api.post(`/assignments/${id}/submit`, data);
};
