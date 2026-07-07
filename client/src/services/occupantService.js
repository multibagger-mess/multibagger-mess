import api from "./api";

const getOccupants = async () => {
    try {
        const response = await api.get("/occupants");

        return {
            success: true,
            data: response.data.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

const createOccupant = async (occupantData) => {
    try {
        const response = await api.post(
            "/occupants",
            occupantData
        );

        return {
            success: true,
            data: response.data.data,
        };
    } catch (error) {
        return {
            success: false,
            message: error.message,
        };
    }
};

        const updateOccupant = async (id, occupantData) => {
         
    try {

        const response = await api.put(
            `/occupants/${id}`,
            occupantData
        );

        return {
            success: true,
            data: response.data.data,
        };

    } catch (error) {

        return {
            success: false,
            message: error.message,
        };

    }
};

           const markOccupantLeft = async (id) => {
    try {

        const response = await api.put(
            `/occupants/${id}/leave`
        );

        return {
            success: true,
            data: response.data.data,
        };

    } catch (error) {

        return {
            success: false,
            message: error.message,
        };

    }
};

        const restoreOccupant = async (id) => {

    try {

        const response = await api.put(
            `/occupants/${id}/restore`
        );

        return {
            success: true,
            data: response.data.data,
        };

    } catch (error) {

        return {
            success: false,
            message: error.message,
        };

    }

};

    const getHostelAvailability = async () => {

    try {

        const response = await api.get(
            "/occupants/availability"
        );

        return {
            success: true,
            data: response.data.data,
        };

    } catch (error) {

        return {
            success: false,
            message: error.message,
        };

    }

};


export default {
    getOccupants,
    createOccupant,
    updateOccupant,
    markOccupantLeft,
    restoreOccupant,
    getHostelAvailability,
};