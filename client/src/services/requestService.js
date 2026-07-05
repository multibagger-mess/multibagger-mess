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

export default {

    submitRequest,

    verifyAccess,

};