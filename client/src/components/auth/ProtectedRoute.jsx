import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function ProtectedRoute({ children }) {

    const access = JSON.parse(
        localStorage.getItem("hostelAccess") || "{}"
    );

    if (!access.success) {

        return (
            <Navigate
                to={ROUTES.ACCESS_DETAILS}
                replace
            />
        );

    }

    if (access.expiryDate) {

        const expiry = new Date(access.expiryDate);

        if (new Date() > expiry) {

            localStorage.removeItem("hostelAccess");

            return (
                <Navigate
                    to={ROUTES.ACCESS_DETAILS}
                    replace
                />
            );

        }

    }

    return children;

}