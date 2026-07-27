export default function VisitorDetailsModal({
    visitor,
    onClose,
}) {

    if (!visitor) return null;

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
                    w-[700px]
                    max-h-[85vh]
                    overflow-y-auto
                    shadow-2xl
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
                            font-bold
                            text-xl
                        "
                    >
                        ✕
                    </button>

                </div>

                <div className="grid grid-cols-2 gap-6">

                    <div>

                        <p className="font-semibold">
                            Visitor ID
                        </p>

                        <p>{visitor.visitorId}</p>

                    </div>

                    <div>

                        <p className="font-semibold">
                            Browser
                        </p>

                        <p>{visitor.browser}</p>

                    </div>

                    <div>

                        <p className="font-semibold">
                            Operating System
                        </p>

                        <p>{visitor.operatingSystem}</p>

                    </div>

                    <div>

                        <p className="font-semibold">
                            Device
                        </p>

                        <p>{visitor.deviceType}</p>

                    </div>

                    <div>

                        <p className="font-semibold">
                            IP Address
                        </p>

                        <p>{visitor.ipAddress}</p>

                    </div>

                    <div>

                        <p className="font-semibold">
                            Visit Count
                        </p>

                        <p>{visitor.visitCount}</p>

                    </div>

                    <div>

                        <p className="font-semibold">
                            First Visit
                        </p>

                        <p>
                            {new Date(visitor.firstVisit).toLocaleString()}
                        </p>

                    </div>

                    <div>

                        <p className="font-semibold">
                            Last Visit
                        </p>

                        <p>
                            {new Date(visitor.lastVisit).toLocaleString()}
                        </p>

                    </div>

                </div>

                <hr className="my-8" />

                <h3 className="text-2xl font-bold mb-4">

                    Visit Timeline

                </h3>

                {

                    visitor.visits.map((visit, index) => (

                        <div
                            key={index}
                            className="
                                border-l-4
                                border-blue-500
                                pl-4
                                mb-5
                            "
                        >

                            <p className="font-semibold">

                                🕒 {new Date(
                                    visit.timestamp
                                ).toLocaleString()}

                            </p>

                            <p>

                                📄 {visit.page}

                            </p>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}