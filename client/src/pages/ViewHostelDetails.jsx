import { ROUTES } from "../constants/routes";
import { useState } from "react";
import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

import requestService from "../services/requestService";

export default function VerifyAccess() {

    const navigate = useNavigate();

    const [phoneNumber, setPhoneNumber] = useState("");

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState("");

    const [error, setError] = useState("");

    const handleVerify = async () => {

    if (!phoneNumber.trim()) {

        setError("Please enter your phone number.");

        return;

    }

    try {

        setLoading(true);

        setError("");

        setMessage("");

        const response = await requestService.verifyAccess(phoneNumber);

        console.log(response);       
        
        localStorage.setItem(

            "hostelAccess",

            JSON.stringify(response)

        );

        setMessage(response.message);

        navigate(ROUTES.DETAILS);

    }

    catch (err) {

        const apiMessage =

            err.response?.data?.message ||

            "Something went wrong.";

        if (apiMessage.includes("under review")) {

            navigate(ROUTES.WAITING);

            return;

        }

        setError(apiMessage);

    }

    finally {

        setLoading(false);

    }

};

    return (

        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">

            <div
                className="
                    w-full
                    max-w-lg
                    bg-white
                    rounded-[32px]
                    shadow-2xl
                    p-10
                    border
                    border-slate-100
                "
            >
            
            <div className="flex justify-center">

    <div
        className="
            w-20
            h-20
            rounded-full
            bg-blue-100
            flex
            items-center
            justify-center
        "
    >

        <ShieldCheck
            size={40}
            className="text-blue-600"
        />

    </div>

</div>

                <h1 className="text-4xl font-extrabold text-slate-900 text-center">


                    Complete Hostel Details

                </h1>

                <p className="mt-4 text-center text-slate-600 leading-7">

                    Enter the <span className="font-semibold">registered mobile number</span>
                    that you used while requesting access.
                    <br />
                    We'll instantly check your approval status.

                </p>

                <input
    type="tel"
    inputMode="numeric"
    maxLength={10}
    value={phoneNumber}
    onChange={(e) => {

        const value = e.target.value.replace(/\D/g, "");

        if (value.length <= 10) {

            setPhoneNumber(value);

        }

        setError("");
        setMessage("");

    }}

    placeholder="Enter 10-digit Registered Mobile Number"

    className="
        w-full
        mt-8
        rounded-2xl
        border
        border-slate-300
        px-5
        py-4
        text-lg
        tracking-wider
        outline-none
        transition
        focus:border-blue-600
        focus:ring-4
        focus:ring-blue-100
    "
/>

                <button

                    onClick={handleVerify}

                    disabled={loading}

                    className="
                        w-full
                        mt-6
                        bg-blue-600
                        hover:bg-blue-700
                        text-white
                        rounded-2xl
                        py-4
                        font-semibold
                        text-lg
                        shadow-lg
                        hover:shadow-xl
                        hover:scale-[1.02]
                        transition-all
                        duration-300
                        cursor-pointer
                    "
                >

                    {loading ? "Verifying..." : "Continue"}

                </button>

                {message && (

                    <p className="mt-5 text-green-600">

                        {message}

                    </p>

                )}

                {error && (

                    <p className="mt-5 text-red-600">

                        {error}

                    </p>

                )}

                <div className="mt-10 border-t pt-8">

    <p className="text-center text-slate-500">

        Don't have approval yet?

    </p>

    <button

        onClick={() => navigate(ROUTES.REQUEST_ACCESS)}

        className="
            mt-4
            w-full
            border
            border-blue-600
            text-blue-600
            rounded-2xl
            py-3
            font-semibold
            hover:bg-blue-50
            hover:scale-[1.02]
            transition-all
            duration-300
            cursor-pointer
        "

    >

        Request Access

    </button>

</div>

            </div>

        </div>

    );

}