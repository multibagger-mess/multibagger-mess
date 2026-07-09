import api from "./api";

const login = async (username, password) => {

    const response = await api.post(
        "/admin/login",
        {
            username,
            password,
        }
    );

    return response.data;
};

export default {
    login,
};