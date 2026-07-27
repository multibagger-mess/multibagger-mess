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

export default {
    trackVisitor,
    getSummary,
    getVisitors,
};