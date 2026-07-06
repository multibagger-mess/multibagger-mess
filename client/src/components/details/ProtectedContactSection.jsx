import { motion } from "framer-motion";
import {
    Phone,
    MessageCircle,
    MapPin,
    Star,
} from "lucide-react";

export default function ProtectedContactSection() {

    return (

        <section
            id="contact"
            className="mt-24"
        >

            <motion.div

                initial={{
                    opacity:0,
                    y:30,
                }}

                whileInView={{
                    opacity:1,
                    y:0,
                }}

                viewport={{
                    once:true,
                }}

                transition={{
                    duration:.6,
                }}

                className="
                    rounded-[36px]
                    bg-gradient-to-r
                    from-blue-700
                    via-blue-600
                    to-indigo-700
                    text-white
                    shadow-2xl
                    overflow-hidden
                "

            >

                <div className="p-12">

                    <p
                        className="
                            uppercase
                            tracking-[0.25em]
                            text-blue-100
                            font-semibold
                        "
                    >
                        Contact & Visit
                    </p>

                    <h2
                        className="
                            mt-4
                            text-5xl
                            font-black
                        "
                    >
                        Get in Touch
                    </h2>

                    <p
                        className="
                            mt-6
                            max-w-3xl
                            leading-8
                            text-blue-100
                        "
                    >
                        You now have access to the owner's contact information and
                        hostel location. Feel free to get in touch if you have
                        any questions or would like to schedule a visit.
                    </p>

                    <div
                        className="
                            grid
                            md:grid-cols-2
                            gap-6
                            mt-12
                        "
                    >

                            <div className="bg-white/10 backdrop-blur rounded-3xl p-8">

    <Phone size={36}/>

    <h3 className="mt-5 text-2xl font-bold">

        Call Owner

    </h3>

    <p className="mt-2 text-blue-100 leading-7">

    Speak directly with the hostel owner regarding
    admissions, room availability and any questions.
    
    </p>

    <a
    href="tel:9907563395"
    className="
        inline-flex
        items-center
        justify-center
        mt-6
        bg-white
        text-blue-700
        px-6
        py-3
        rounded-full
        font-semibold
        hover:scale-105
        transition
    "
    >
    📞 Call Now
    </a>

</div>

<div className="bg-white/10 backdrop-blur rounded-3xl p-8">

    <MessageCircle size={36}/>

    <h3 className="mt-5 text-2xl font-bold">

        WhatsApp

    </h3>

    <p className="mt-2 text-blue-100 leading-7">

    Start a private WhatsApp conversation with
    the hostel owner.
    
    </p>
    <a
    href="https://wa.me/918637800514"
    target="_blank"
    rel="noopener noreferrer"
    className="
        inline-flex
        items-center
        justify-center
        mt-6
        bg-white
        text-green-700
        px-6
        py-3
        rounded-full
        font-semibold
        hover:scale-105
        transition
    "
    >
    💬 Chat on WhatsApp
    </a>

</div>

<div className="bg-white/10 backdrop-blur rounded-3xl p-8">

    <MapPin size={36}/>

    <h3 className="mt-5 text-2xl font-bold">

        Google Maps

    </h3>

    <p className="mt-2 text-blue-100">

        Exact hostel location

    </p>

    <button

        disabled

        className="
            mt-6
            bg-white/30
            px-6
            py-3
            rounded-full
            cursor-not-allowed
        "

    >

        Coming Soon

    </button>

</div>

<div className="bg-white/10 backdrop-blur rounded-3xl p-8">

    <Star size={36}/>

    <h3 className="mt-5 text-2xl font-bold">

        Google Business

    </h3>

    <p className="mt-2 text-blue-100">

        Reviews, Photos & Directions

    </p>

    <button

        disabled

        className="
            mt-6
            bg-white/30
            px-6
            py-3
            rounded-full
            cursor-not-allowed
        "

    >

        QR Coming Soon

    </button>

</div>

                    </div>

                    <p

                        className="
                            mt-12
                            text-center
                            text-blue-100
                            leading-8
                        "

                    >

                        We look forward to welcoming you to
                        <strong> The Multi-Bagger Mess</strong>.
                        If you have any questions before admission,
                        don't hesitate to contact us.

                    </p>

                </div>

            </motion.div>

        </section>

    );

}                    