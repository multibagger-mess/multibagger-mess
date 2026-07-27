import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import visitorService from "../services/visitorService";

export default function useVisitorTracking() {

    const location = useLocation();

    useEffect(() => {

        const ignoredPrefixes = [

            "/admin",

        ];

        const shouldIgnore = ignoredPrefixes.some((prefix) =>
            location.pathname.startsWith(prefix)
        );

        if (shouldIgnore) {

            return;

        }

        visitorService.trackVisitor(location.pathname);

    }, [location.pathname]);

}