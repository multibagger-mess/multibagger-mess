import { motion } from "framer-motion";
import {
    Lock,
    UserPlus,
    ShieldCheck,
    BadgeCheck,
    MessageSquare,
    Smartphone,
    Home,
    ArrowDown,
    Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const steps = [
    {
        icon: UserPlus,
        title: "Request Access",
        description:
            "Enter your name and registered mobile number.",
    },
    {
        icon: ShieldCheck,
        title: "Admin Reviews",
        description:
            "Your request is manually reviewed to protect resident privacy.",
    },
    {
        icon: BadgeCheck,
        title: "Approval",
        description:
            "If approved, your access is activated immediately.",
    },
    {
        icon: MessageSquare,
        title: "Access Notification",
        description:
            "Receive your secure access link through SMS or WhatsApp.",
    },
    {
        icon: Smartphone,
        title: "Already on the Website?",
        description:
            "Click 'View Hostel Details' and enter your registered mobile number.",
    },
    {
        icon: Home,
        title: "View Hostel Details",
        description:
            "Access rent, facilities, address, contact details and everything else.",
    },
];

export default function HowItWorks() {

    const firstSteps = steps.slice(0,3);

    return (
        <section
            id="process"
            className="py-24 bg-slate-50"
        >
            <div className="max-w-6xl mx-auto px-6">

                <div className="text-center mb-16">

                    <div
                        className="
                            inline-flex
                            items-center
                            gap-2
                            bg-blue-100
                            text-blue-700
                            px-5
                            py-2
                            rounded-full
                            font-medium
                            mb-6
                        "
                    >
                        <Lock size={18}/>
                        Privacy Protected
                    </div>

                    <h2 className="text-5xl font-bold text-slate-900">
                        How It Works
                    </h2>

                    <p className="text-slate-600 text-lg mt-6 max-w-3xl mx-auto">
                        Getting hostel information is simple, secure and
                        designed to protect the privacy of current residents.
                    </p>

                </div>

                <div className="space-y-10">

                    {firstSteps.map((step, index) => {

                        const Icon = step.icon;

                        return (

                            <motion.div
                                key={index}
                                initial={{
                                    opacity:0,
                                    y:40,
                                }}
                                whileInView={{
                                    opacity:1,
                                    y:0,
                                }}
                                transition={{
                                    duration:0.5,
                                    delay:index*0.08,
                                }}
                                viewport={{
                                    once:true,
                                }}
                            >

                                <div
                                    className="
                                        bg-white
                                        rounded-3xl
                                        shadow-md
                                        hover:shadow-xl
                                        transition
                                        p-8
                                        flex
                                        gap-6
                                        items-start
                                    "
                                >

                                    <div
                                        className="
                                            w-16
                                            h-16
                                            rounded-full
                                            bg-blue-600
                                            text-white
                                            flex
                                            items-center
                                            justify-center
                                            font-bold
                                            text-xl
                                            shrink-0
                                        "
                                    >
                                        {index+1}
                                    </div>

                                    <div className="flex-1">

                                        <div className="flex items-center gap-3">

                                            <Icon
                                                className="text-blue-600"
                                                size={24}
                                            />

                                            <h3 className="text-2xl font-bold">
                                                {step.title}
                                            </h3>

                                        </div>

                                        <p className="text-slate-600 mt-3 text-lg">
                                            {step.description}
                                        </p>

                                    </div>

                                </div>

                            </motion.div>

                        );

                    })}

                </div>

<div className="text-center my-16">

    <h3 className="text-3xl font-bold text-slate-900">

        After Approval

    </h3>

    <p className="text-slate-600 mt-3">

        You can access hostel details using either of the following methods.

    </p>

</div>

<div className="grid md:grid-cols-2 gap-8 mb-14">

    {/* OPTION 1 */}

    <div
        className="
            bg-green-50
            border
            border-green-200
            rounded-3xl
            shadow-md
            p-8
        "
    >

        <div className="text-5xl mb-5">
            📱
        </div>

        <h3 className="text-2xl font-bold mb-2">

            Option 1

        </h3>

        <h4 className="text-green-700 text-xl font-semibold mb-6">

            Receive SMS / WhatsApp / Telegram

        </h4>

        <div className="space-y-4 text-slate-700">

            <p>✅ Your request gets approved.</p>

            <p>✅ Receive a secure tokenised link.</p>

            <p>✅ Tap the link.</p>

            <p>✅ Hostel details open instantly.</p>

        </div>

    </div>


    {/* OPTION 2 */}

    <div
        className="
            bg-blue-50
            border
            border-blue-200
            rounded-3xl
            shadow-md
            p-8
        "
    >

        <div className="text-5xl mb-5">
            🌐
        </div>

        <h3 className="text-2xl font-bold mb-2">

            Option 2

        </h3>

        <h4 className="text-blue-700 text-xl font-semibold mb-6">

            Already on the Website?

        </h4>

        <div className="space-y-4 text-slate-700">

            <p className="flex items-center gap-2">
                ✅ Click <strong>"View Hostel Details"</strong>.
            </p>

            <p className="flex items-center gap-2">
                📱 On mobile, tap the
                <Menu
                    size={16}
                    className="inline mx-1 text-slate-700"
                />
                menu first to access it.
            </p>

            <p>✅ Enter your registered mobile number.</p>

            <p>✅ Verification is completed.</p>

            <p>✅ Hostel details become available.</p>

        </div>

    </div>

</div>

<div className="flex justify-center my-10">

    <ArrowDown
        className="text-blue-500"
        size={48}
    />

</div>

<div
    className="
        max-w-3xl
        mx-auto
        bg-gradient-to-r
        from-blue-600
        to-indigo-700
        text-white
        rounded-3xl
        shadow-xl
        p-10
        text-center
        mb-20
    "
>

    <div className="text-6xl mb-5">

        🏠

    </div>

    <h3 className="text-3xl font-bold mb-4">

        Complete Hostel Details

    </h3>

    <p className="text-blue-100 text-lg">

        Both access methods will securely take you to the
        complete hostel information after successful verification.

    </p>

    <div
        className="
            grid
            md:grid-cols-2
            gap-4
            mt-8
            text-left
        "
    >

        <div>✅ Monthly Charges</div>

        <div>✅ Room Facilities</div>

        <div>✅ Room Photos</div>

        <div>✅ Contact Details</div>

        <div>✅ FAQs </div>

        <div>✅ House Rules</div>

    </div>

</div>

                <div
                    className="
                        bg-blue-50
                        rounded-3xl
                        p-10
                        text-center
                    "
                >

                    <h3 className="text-3xl font-bold mb-4">
                        Ready to Get Started?
                    </h3>

                    <p className="text-slate-600 mb-8">
                        Request access today and receive complete hostel
                        information after approval.
                    </p>

                    <Link
                        to={ROUTES.REQUEST_ACCESS}
                        className="
                            inline-block
                            bg-blue-600
                            hover:bg-blue-700
                            text-white
                            px-10
                            py-4
                            rounded-xl
                            font-semibold
                            transition
                        "
                    >
                        Request Access
                    </Link>

                    <div
                        className="
                            mt-10
                            bg-white
                            rounded-2xl
                            p-6
                            border
                            border-blue-100
                        "
                    >
                        <div className="flex justify-center mb-3">
                            <Lock
                                className="text-blue-600"
                            />
                        </div>

                        <h4 className="font-bold text-xl">
                            Your Privacy Matters
                        </h4>

                        <p className="text-slate-600 mt-3">
                            Hostel details are shared only with approved
                            students to ensure the privacy and safety of
                            current residents.
                        </p>

                    </div>

                </div>

            </div>
        </section>
    );
}