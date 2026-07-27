export default function VisitorDetailsModal({
    visitor,
    onClose,
}) {

    if (!visitor) return null;

    const getPageName = (page) => {

        switch (page) {

            case "/":
                return "🏠 Landing Page";

            case "/request-access":
                return "📝 Request Access";

            case "/details":
                return "📄 Hostel Details";

            case "/waiting":
                return "⏳ Waiting Page";

            case "/view-hostel-details":
                return "🏡 View Hostel Details";

            default:
                return page;
        }

    };

    return (

        <div
            className="
                fixed
                inset-0
                bg-black/40
                flex
                justify-center
                items-center
                z-50
            "
        >

            <div
                className="
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    w-[800px]
                    max-h-[85vh]
                    overflow-y-auto
                    p-8
                "
            >

                <div className="flex justify-between items-center mb-6">

                    <h2 className="text-3xl font-bold">

                        Visitor Details

                    </h2>

                    <button
                        onClick={onClose}
                        className="
                            text-red-600
                            text-xl
                            font-bold
                            cursor-pointer
                            hover:text-red-700
                            hover:scale-110
                            transition
                            duration-200
                        "
                        aria-label="Close visitor details"
                    >
                        ✕
                    </button>

                </div>

                <div className="grid md:grid-cols-2 gap-6">

                    <Info title="Visitor ID" value={visitor.visitorId} />

                    <Info title="Browser" value={visitor.browser} />

                    <Info title="Operating System" value={visitor.operatingSystem} />

                    <Info title="Device" value={visitor.deviceType} />

                    <Info title="IP Address" value={visitor.ipAddress} />

                    <Info title="Visit Count" value={visitor.visitCount} />

                    <Info
                        title="First Visit"
                        value={new Date(visitor.firstVisit).toLocaleString()}
                    />

                    <Info
                        title="Last Visit"
                        value={new Date(visitor.lastVisit).toLocaleString()}
                    />

                </div>

                <hr className="my-8" />

                <h3 className="text-2xl font-bold mb-5">

                    Visit Timeline

                </h3>

                {

                    visitor.visits.map((visit, index) => (

                        <div

                            key={index}

                            className="
                                border-l-4
                                border-blue-500
                                pl-5
                                mb-5
                            "

                        >

                            <p className="font-semibold">

                                {new Date(
                                    visit.timestamp
                                ).toLocaleString()}

                            </p>

                            <p>

                                {getPageName(visit.page)}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

function Info({ title, value }) {

    return (

        <div>

            <p className="text-slate-500">

                {title}

            </p>

            <p className="font-semibold">

                {value}

            </p>

        </div>

    );

}