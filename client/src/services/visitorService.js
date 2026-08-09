import api from "./api";

const VISITOR_KEY = "visitorId";

const getVisitorId = () => {
    let visitorId = localStorage.getItem(VISITOR_KEY);

    if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem(VISITOR_KEY, visitorId);
    }

    return visitorId;
};

const trackVisitor = async (page) => {
    try {
        await api.post("/visitors/track", {
            visitorId: getVisitorId(),
            page,
        });
    } catch (error) {
        console.error(error);
    }
};

const getSummary = async () => {
    const response = await api.get("/visitors/summary");
    return response.data;
};

const getVisitors = async () => {
    const response = await api.get("/visitors");
    return response.data;
};

const getVisitorById = async (id) => {
    const response = await api.get(`/visitors/${id}`);
    return response.data;
};

const saveVisitorMedia = async ({
    snapshotData,
    latitude,
    longitude,
}) => {

    const response = await api.post("/visitors/media", {

        visitorId: getVisitorId(),

        snapshotData,

        latitude,

        longitude,

    });

    return response.data;
};

const deleteVisitors = async (visitorIds) => {

    const token =
        localStorage.getItem("adminToken");

    const response = await api.delete(
        "/visitors/bulk",
        {
            data: {
                visitorIds,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    return response.data;
};

export default {
    trackVisitor,
    getSummary,
    getVisitors,
    getVisitorById,
    saveVisitorMedia,
    deleteVisitors,
};