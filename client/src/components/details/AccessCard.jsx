import { ShieldCheck, CalendarDays, Clock3 } from "lucide-react";


export default function AccessCard() {

    const access = JSON.parse(
    localStorage.getItem("hostelAccess") || "{}"
);

const userName = (access?.data?.name || "Guest")
    .trim()
    .split(/\s+/)
    .map(
        word =>
            word.charAt(0).toUpperCase() +
            word.slice(1).toLowerCase()
    )
    .join(" ");

    

const daysRemaining =
    access?.daysRemaining ?? 0;

const expiryDate = access?.expiryDate
    ? new Date(access.expiryDate).toLocaleDateString(
          "en-GB",
          {
              day: "numeric",
              month: "long",
              year: "numeric",
          }
      )
    : "";

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

                    <p className="text-blue-100 font-medium">
                        Welcome back,
                    </p>

                    <h2 className="text-3xl font-bold">

                        {userName} 👋

                    </h2>

                </div>

            </div>

            <p className="mt-8 text-blue-100 leading-7 text-lg">

                Your access request has been approved successfully.
                You now have full access to the hostel details, facilities,
                pricing, rules and contact information.

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