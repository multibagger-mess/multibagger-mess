import { useNavigate } from "react-router-dom";
import adminAuthService from "../services/adminAuthService";
import { ROUTES } from "../constants/routes";
import { useState, useEffect } from "react";

export default function AdminLogin() {

    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

    const token = localStorage.getItem(

        "adminToken"

    );

    if(token){

        navigate(

            ROUTES.ADMIN_DASHBOARD

        );

    }

},[]);

    const handleLogin = async () => {

    try {

        const response =
            await adminAuthService.login(
                username,
                password
            );

        localStorage.setItem(
            "adminToken",
            response.token
        );

        navigate(
            ROUTES.ADMIN_DASHBOARD
        );

    }

    catch (error) {

        alert(
            error.response?.data?.message ||
            "Login Failed"
        );

    }

};
    
    return (

        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">

                <h1 className="text-3xl font-bold text-center mb-8">

                    Admin Login

                </h1>

                <input

                    type="text"

                    placeholder="Username"

                    value={username}

                    onChange={(e)=>setUsername(e.target.value)}

                    className="w-full border rounded-xl px-4 py-3 mb-5"

                />

                <input

                    type="password"

                    placeholder="Password"

                    value={password}

                    onChange={(e)=>setPassword(e.target.value)}

                    className="w-full border rounded-xl px-4 py-3 mb-6"

                />

                <button
                    onClick={handleLogin}
                    className="
                        w-full
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        rounded-xl
                        py-3
                        font-semibold
                        transition
                        cursor-pointer
                    "
                >
                    Login
                </button>

            </div>

        </div>

    );

}