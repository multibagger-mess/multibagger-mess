import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import requestService from "../services/requestService";
import { ROUTES } from "../constants/routes";

export default function AccessTokenPage() {

    const navigate = useNavigate();

    const { token } = useParams();

    useEffect(() => {

        const verifyToken = async () => {

            try {

                const response =
                    await requestService.verifyAccessToken(
                        token
                    );

                localStorage.setItem(
                    "hostelAccess",
                    JSON.stringify(response)
                );

                navigate(ROUTES.DETAILS);

            }

            catch {

                navigate(ROUTES.WAITING);

            }

        };

        verifyToken();

    }, [navigate, token]);

    return (

        <div className="min-h-screen flex items-center justify-center">

            <h2 className="text-2xl font-semibold">

                Verifying Secure Link...

            </h2>

        </div>

    );

}