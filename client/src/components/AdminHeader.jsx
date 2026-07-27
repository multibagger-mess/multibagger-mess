import { useNavigate } from "react-router-dom";
import {
    LayoutDashboard,
    LogOut,
    Home,
} from "lucide-react";

export default function AdminHeader({ title }) {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("adminToken");

        navigate("/admin/login");

    };

    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
                borderBottom: "1px solid #e5e7eb",
                paddingBottom: "15px",
            }}
        >

            <div>

                <button
                    onClick={() => navigate("/")}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#475569",
                        cursor: "pointer",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "8px",
                        transition: "0.2s",
                    }}
                >
                    <Home size={16} />
                    Back to Website
                </button>

                <button
                    onClick={() =>
                        navigate("/admin/dashboard")
                    }
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#2563eb",
                        cursor: "pointer",
                        fontSize: "15px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        marginBottom: "12px",
                        transition: "0.2s",
                    }}
                >
                    <LayoutDashboard size={16} />
                    Dashboard
                </button>

                <h1
                    style={{
                        fontSize: "32px",
                        margin: 0,
                    }}
                >
                    {title}
                </h1>

            </div>

            <button
                onClick={logout}
                style={{
                    background: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    fontWeight: "600",
                }}
            >
                <LogOut size={16} />
                Logout
            </button>

        </div>

    );

}