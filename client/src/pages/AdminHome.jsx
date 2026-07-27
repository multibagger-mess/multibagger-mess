import { useNavigate } from "react-router-dom";

export default function AdminHome() {

    const navigate = useNavigate();

    const cards = [

        {
            title: "📋 Request Management",
            description:
                "Approve, reject and manage hostel requests.",
            route: "/admin/requests",
        },

        {
            title: "👥 Occupant Management",
            description:
                "Manage all current hostel occupants.",
            route: "/admin/occupants",
        },

        {
            title: "📍 Google Maps",
            description:
                "Coming Soon",
            disabled: true,
        },

        {
            title: "📊 Visitor Analytics",
            description:
                "Monitor visitor traffic, browsers, devices and visit history.",
            route: "/admin/visitor-analytics",
        },

    ];

    return (

        <div
            className="
            min-h-screen
            bg-slate-100
            p-10
        "
        >

            <div
                className="
                flex
                justify-between
                items-center
                mb-10
                border-b
                border-slate-300
                pb-5
            "
            >

                <h1
                    className="
                    text-4xl
                    font-bold
                "
                >

                    Admin Dashboard

                </h1>

                <div className="flex gap-3">

    <button

        onClick={() => navigate("/")}

        className="
        flex
        items-center
        gap-2
        bg-white
        border
        border-slate-300
        px-5
        py-2
        rounded-lg
        hover:bg-slate-100
        transition
        cursor-pointer
    "

    >

        🏠 Back to Website

    </button>

    <button

        onClick={() => {

            localStorage.removeItem(
                "adminToken"
            );

            navigate(
                "/admin/login"
            );

        }}

        className="
        flex
        items-center
        gap-2
        bg-red-600
        hover:bg-red-700
        text-white
        px-5
        py-2
        rounded-lg
        transition
        cursor-pointer
    "

    >

        🚪 Logout

    </button>

</div>

            </div>

            <div
                className="
                grid
                md:grid-cols-2
                gap-8
            "
            >

                {

                    cards.map((card) => (

                        <div

                            key={card.title}

                            onClick={() => {

                                if (
                                    !card.disabled
                                ) {

                                    navigate(
                                        card.route
                                    );

                                }

                            }}

                            className={`
                            bg-white
                            rounded-2xl
                            shadow-lg
                            p-8
                            transition
                            ${card.disabled
                                    ? "opacity-50 cursor-not-allowed"
                                    : "hover:shadow-2xl hover:-translate-y-1 cursor-pointer"
                                }
                        `}

                        >

                            <h2
                                className="
                                text-2xl
                                font-semibold
                                mb-3
                            "
                            >

                                {card.title}

                            </h2>

                            <p
                                className="
                                text-slate-600
                            "
                            >

                                {card.description}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}