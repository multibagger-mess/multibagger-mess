import { Navigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function AdminProtectedRoute({ children }) {

    const token = localStorage.getItem("adminToken");

    if (!token) {

        return (
            <Navigate
                to={ROUTES.ADMIN_LOGIN}
                replace
            />
        );

    }

    return children;

}