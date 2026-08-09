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


    const hasSnapshot =
        visitor.snapshot?.shared &&
        visitor.snapshot?.data;


    const hasLocation =
        visitor.location?.shared &&
        typeof visitor.location?.latitude === "number" &&
        typeof visitor.location?.longitude === "number";


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
                p-4
            "
        >

            <div
                className="
                    bg-white
                    rounded-2xl
                    shadow-2xl
                    w-[900px]
                    max-w-full
                    max-h-[90vh]
                    overflow-y-auto
                    p-8
                "
            >

                {/* Header */}

                <div
                    className="
                        flex
                        justify-between
                        items-center
                        mb-6
                    "
                >

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


                {/* Main Visitor Information */}

                <div
                    className="
                        grid
                        md:grid-cols-3
                        gap-8
                    "
                >

                    {/* Visitor Information */}

                    <div
                        className="
                            md:col-span-2
                            grid
                            md:grid-cols-2
                            gap-6
                        "
                    >

                        <Info
                            title="Visitor ID"
                            value={visitor.visitorId}
                        />

                        <Info
                            title="Browser"
                            value={visitor.browser}
                        />

                        <Info
                            title="Operating System"
                            value={visitor.operatingSystem}
                        />

                        <Info
                            title="Device"
                            value={visitor.deviceType}
                        />

                        <Info
                            title="IP Address"
                            value={visitor.ipAddress}
                        />

                        <Info
                            title="Visit Count"
                            value={visitor.visitCount}
                        />

                        <Info
                            title="First Visit"
                            value={
                                new Date(
                                    visitor.firstVisit
                                ).toLocaleString()
                            }
                        />

                        <Info
                            title="Last Visit"
                            value={
                                new Date(
                                    visitor.lastVisit
                                ).toLocaleString()
                            }
                        />

                    </div>


                    {/* Visitor Snapshot */}

                    <div
                        className="
                            flex
                            flex-col
                            items-center
                            justify-start
                        "
                    >

                        <p
                            className="
                                text-slate-500
                                mb-3
                                self-start
                            "
                        >

                            Visitor Snapshot

                        </p>


                        {hasSnapshot ? (

                            <div
                                className="
                                    w-full
                                    max-w-[240px]
                                    aspect-[4/3]
                                    rounded-xl
                                    overflow-hidden
                                    border
                                    border-slate-200
                                    shadow-md
                                    bg-slate-100
                                "
                            >

                                <img
                                    src={visitor.snapshot.data}
                                    alt="Visitor snapshot"
                                    className="
                                        w-full
                                        h-full
                                        object-cover
                                    "
                                />

                            </div>

                        ) : (

                            <div
                                className="
                                    w-full
                                    max-w-[240px]
                                    aspect-[4/3]
                                    rounded-xl
                                    border
                                    border-slate-200
                                    bg-slate-100
                                    flex
                                    items-center
                                    justify-center
                                    text-slate-500
                                    text-sm
                                    text-center
                                    p-4
                                "
                            >

                                Snapshot not available

                            </div>

                        )}

                    </div>

                </div>


                {/* Location */}

                <div className="mt-8">

                    <h3
                        className="
                            text-xl
                            font-bold
                            mb-4
                        "
                    >
                        📍 Visitor Location
                    </h3>

                    {hasLocation ? (

                        <div
                            className="
                                bg-slate-50
                                border
                                border-slate-200
                                rounded-xl
                                p-5
                            "
                        >

                            <div className="space-y-5">

                                {/* Location Name */}

                                <div>

                                    <p className="text-slate-500 mb-1">
                                        Location
                                    </p>

                                    <p className="font-semibold text-lg">
                                        {visitor.location.name ||
                                            "Location name unavailable"}
                                    </p>

                                </div>


                                {/* Location Captured */}

                                <div>

                                    <p className="text-slate-500 mb-1">
                                        Location Captured
                                    </p>

                                    <p className="font-semibold">
                                        {visitor.location.capturedAt
                                            ? new Date(
                                                visitor.location.capturedAt
                                            ).toLocaleString()
                                            : "N/A"}
                                    </p>

                                </div>


                                {/* Google Maps */}

                                <a
                                    href={`https://www.google.com/maps?q=${visitor.location.latitude},${visitor.location.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        bg-blue-600
                                        text-white
                                        px-5
                                        py-2.5
                                        rounded-lg
                                        font-semibold
                                        hover:bg-blue-700
                                        transition
                                        w-fit
                                    "
                                >
                                    📍 Open in Google Maps
                                </a>

                            </div>

                        </div>

                    ) : (

                        <div
                            className="
                                bg-slate-50
                                border
                                border-slate-200
                                rounded-xl
                                p-5
                                text-slate-500
                            "
                        >
                            Location not available
                        </div>

                    )}

                </div>


                <hr className="my-8" />


                {/* Visit Timeline */}

                <h3
                    className="
                        text-2xl
                        font-bold
                        mb-5
                    "
                >

                    Visit Timeline

                </h3>


                {visitor.visits?.map((visit, index) => (

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

                ))}

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

            <p className="font-semibold break-words">

                {value}

            </p>

        </div>

    );

}