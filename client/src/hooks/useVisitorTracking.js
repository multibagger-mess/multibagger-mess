import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import visitorService from "../services/visitorService";

export default function useVisitorTracking() {
    const location = useLocation();

    useEffect(() => {
        visitorService.trackVisitor(location.pathname);
    }, [location.pathname]);
}