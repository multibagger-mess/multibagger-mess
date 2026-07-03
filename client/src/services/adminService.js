import api from "./api";

const getAllRequests = async () => {

    const response = await api.get("/requests");

    return response.data;

};

const updateRequestStatus = async (id, status) => {

    const response = await api.patch(
        `/requests/${id}`,
        { status }
    );

    return response.data;

};

export default {
    getAllRequests,
    updateRequestStatus,
};