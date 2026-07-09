import { useNavigate } from "react-router-dom";

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

                    onClick={() =>
                        navigate("/admin/dashboard")
                    }

                    style={{
                        background: "transparent",
                        border: "none",
                        color: "#2563eb",
                        cursor: "pointer",
                        fontSize: "16px",
                        marginBottom: "10px",
                    }}

                >
                    ← Dashboard
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
                }}

            >
                Logout
            </button>

        </div>

    );

}