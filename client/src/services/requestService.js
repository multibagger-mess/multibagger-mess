import api from "./api";

const submitRequest = async (requestData) => {

    const response = await api.post(
        "/requests",
        {
            name: requestData.name,
            phoneNumber: requestData.phone,
        }
    );

    return response.data;
};

export default {
    submitRequest,
};