import { ShieldCheck, CalendarDays, Clock3 } from "lucide-react";

export default function AccessCard({

    userName = "Guest",

    daysRemaining = 5,

    expiryDate = "10 July 2026",

}) {

    return (

        <section
            className="
                bg-gradient-to-r
                from-blue-600
                to-indigo-700
                rounded-3xl
                p-8
                text-white
                shadow-2xl
            "
        >

            <div className="flex items-center gap-4">

                <div
                    className="
                        w-16
                        h-16
                        rounded-full
                        bg-white/20
                        flex
                        items-center
                        justify-center
                    "
                >

                    <ShieldCheck size={34} />

                </div>

                <div>

                    <p className="text-blue-100">

                        Welcome,

                    </p>

                    <h2 className="text-3xl font-bold">

                        {userName} 👋

                    </h2>

                </div>

            </div>

            <p className="mt-8 text-blue-100 leading-7">

                Your request has been approved.

                You now have access to view all hostel information.

            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-8">

                <div
                    className="
                        bg-white/10
                        rounded-2xl
                        p-5
                    "
                >

                    <div className="flex items-center gap-3">

                        <Clock3 />

                        <h3 className="font-semibold">

                            Access Remaining

                        </h3>

                    </div>

                    <p className="mt-3 text-3xl font-bold">

                        {daysRemaining} Days

                    </p>

                </div>

                <div
                    className="
                        bg-white/10
                        rounded-2xl
                        p-5
                    "
                >

                    <div className="flex items-center gap-3">

                        <CalendarDays />

                        <h3 className="font-semibold">

                            Valid Until

                        </h3>

                    </div>

                    <p className="mt-3 text-3xl font-bold">

                        {expiryDate}

                    </p>

                </div>

            </div>

        </section>

    );

}