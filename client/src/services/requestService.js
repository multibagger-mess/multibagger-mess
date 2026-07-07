import api from "./api";

/*
|--------------------------------------------------------------------------
| Submit Access Request
|--------------------------------------------------------------------------
*/

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

/*
|--------------------------------------------------------------------------
| Verify Access
|--------------------------------------------------------------------------
*/

const verifyAccess = async (phoneNumber) => {

    const response = await api.post(
        "/requests/verify",
        {
            phoneNumber,
        }
    );

    return response.data;

};

/*
|--------------------------------------------------------------------------
| Verify Access Token
|--------------------------------------------------------------------------
*/

const verifyAccessToken = async (token) => {

    const response = await api.get(
        `/requests/access/${token}`
    );

    return response.data;

};

export default {

    submitRequest,

    verifyAccess,

    verifyAccessToken,

};