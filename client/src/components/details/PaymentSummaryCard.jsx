import { motion } from "framer-motion";
import { CheckCircle2, IndianRupee } from "lucide-react";

export default function PaymentSummaryCard({

    rentRevealed,

    cleaningRevealed,

    rent,

    cleaning,

}) {

    const ready = rentRevealed && cleaningRevealed;

    const total = rent + cleaning;

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 40,
            }}

            animate={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: .6,
            }}

            className="
                mt-10
                rounded-3xl
                border
                border-yellow-300
                bg-gradient-to-br
                from-yellow-50
                via-white
                to-yellow-100
                shadow-2xl
                overflow-hidden
            "

        >

            <div className="p-8">

                <h2
                    className="
                        text-3xl
                        font-bold
                        text-center
                        text-slate-800
                    "
                >

                    Monthly Payment

                </h2>

                <p
                    className="
                        mt-2
                        text-center
                        text-slate-500
                    "
                >

                    Transparent Pricing • No Hidden Charges

                </p>

                {!ready ? (

                    <div
                        className="
                            mt-10
                            text-center
                        "
                    >

                        <div className="text-6xl">

                            🔒

                        </div>

                        <h3
                            className="
                                mt-4
                                text-2xl
                                font-semibold
                            "
                        >

                            Reveal Both Cards

                        </h3>

                        <p
                            className="
                                mt-3
                                text-slate-500
                            "
                        >

                            Reveal the Hostel Rent and Weekly Cleaning &
                            Maintenance charges to calculate your total
                            monthly payment.

                        </p>

                    </div>

                ) : (

                    <motion.div

                        initial={{
                            scale: .85,
                            opacity: 0,
                        }}

                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}

                        transition={{
                            duration: .6,
                        }}

                    >

                        <div
                            className="
                                mt-10
                                flex
                                items-center
                                justify-center
                                gap-2
                            "
                        >

                            <IndianRupee
                                size={40}
                                className="text-yellow-600"
                            />

                            <span
                                className="
                                    text-6xl
                                    font-black
                                    text-yellow-600
                                "
                            >

                                {total}

                            </span>

                        </div>

                        <p
                            className="
                                text-center
                                mt-2
                                text-lg
                                text-slate-600
                            "
                        >

                            Per Person / Month

                        </p>

                        <div
                            className="
                                mt-10
                                rounded-2xl
                                bg-white
                                p-6
                                shadow-md
                            "
                        >

                            <div className="flex justify-between">

                                <span>Hostel Rent</span>

                                <strong>₹ {rent}</strong>

                            </div>

                            <div className="flex justify-between mt-4">

                                <span>

                                    Weekly Cleaning &
                                    Maintenance

                                </span>

                                <strong>₹ {cleaning}</strong>

                            </div>

                            <hr className="my-6" />

                            <div
                                className="
                                    flex
                                    justify-between
                                    text-xl
                                    font-bold
                                "
                            >

                                <span>Total</span>

                                <span>

                                    ₹ {total}

                                </span>

                            </div>

                        </div>

                        <div
                            className="
                                mt-8
                                grid
                                md:grid-cols-2
                                gap-4
                            "
                        >

                            {[
                                "Hostel Accommodation",
                                "Weekly Bathroom Cleaning",
                                "Weekly Lavatory Cleaning",
                                "Weekly Room Mopping",
                                "Electricity Included",
                                "Drinking Water Included",
                            ].map((item) => (

                                <div
                                    key={item}
                                    className="
                                        flex
                                        items-center
                                        gap-3
                                    "
                                >

                                    <CheckCircle2
                                        size={20}
                                        className="text-green-600"
                                    />

                                    <span>

                                        {item}

                                    </span>

                                </div>

                            ))}

                        </div>

                    </motion.div>

                )}

            </div>

        </motion.div>

    );

}