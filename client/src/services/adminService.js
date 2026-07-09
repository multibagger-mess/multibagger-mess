import api from "./api";

const getToken = () => {

    return localStorage.getItem(
        "adminToken"
    );

};

const getHeaders = () => ({

    Authorization:
        `Bearer ${getToken()}`,

});

const getAllRequests = async () => {

    try{

    const response = await api.get(

        "/requests",

        {

            headers:getHeaders()

        }

    );

    return response.data;

}

catch(error){

    if(

        error.response?.status===401

    ){

        localStorage.removeItem(

            "adminToken"

        );

        window.location.href="/admin/login";

    }

    throw error;

}

};

const updateRequestStatus = async (

    id,

    status

) => {

    try {

        const response = await api.patch(

            `/requests/${id}`,

            {
                status,
            },

            {
                headers: getHeaders(),
            }

        );

        return response.data;

    }

    catch (error) {

        if (

            error.response?.status === 401

        ) {

            localStorage.removeItem(

                "adminToken"

            );

            window.location.href = "/admin/login";

        }

        throw error;

    }

};

export default {

    getAllRequests,

    updateRequestStatus,

};