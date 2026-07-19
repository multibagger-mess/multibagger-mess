import { motion, AnimatePresence } from "framer-motion";
import { IndianRupee, CheckCircle2 } from "lucide-react";

export default function PaymentBreakdown({
    rent,
    cleaning,
    originalCleaning,
    displayTotal,
    offerUnlocked,
    showLifetimeBadge,
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`
                relative
                overflow-hidden
                rounded-3xl
                border
                ${
                    offerUnlocked
                        ? "border-amber-300 shadow-2xl"
                        : "border-gray-200 shadow-xl"
                }
                bg-white
            `}
        >
            {/* Golden Glow */}

                {offerUnlocked && (

                    <motion.div

                        initial={{
                            opacity: 0,
                        }}

                        animate={{
                            opacity: 1,
                        }}

                        transition={{
                            duration: 0.8,
                        }}

                        className="
                            absolute
                            inset-0
                            bg-gradient-to-r
                            from-yellow-200/20
                            via-amber-100/30
                            to-yellow-200/20
                            pointer-events-none
                        "

                    />

                )}

            {/* Header */}

            <div className="border-b bg-gray-50 px-6 py-5">
                <div className="flex items-center justify-between">

    <h2 className="text-xl font-bold">
        Monthly Fee Summary
    </h2>

    {offerUnlocked && (

        <motion.span

            initial={{
                scale: 0,
                rotate: -20,
            }}

            animate={{
                scale: 1,
                rotate: 0,
            }}

            transition={{
                type: "spring",
                stiffness: 220,
                damping: 12,
            }}

            className="
                rounded-full
                bg-amber-100
                px-3
                py-1
                text-xs
                font-bold
                text-amber-700
                shadow-sm
            "
        >

            ⭐ FOUNDER PRICE

        </motion.span>

    )}

</div>

                <p className="mt-1 text-sm text-gray-500">
                    Transparent pricing with no hidden charges.
                </p>
            </div>

            {/* Body */}

            <div className="space-y-6 p-6">

                {/* Rent */}

                <div className="flex items-center justify-between">

                    <span className="text-gray-600">
                        Hostel Rent
                    </span>

                    <span className="font-semibold">
                        ₹{rent}
                    </span>

                </div>

                {/* Cleaning */}

                <div className="flex items-center justify-between">

                    <span className="text-gray-600">
                        Cleaning Fee
                    </span>

                    <AnimatePresence mode="wait">

                        {!offerUnlocked ? (

                            <motion.span
                                key="fee"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="font-semibold"
                            >
                                ₹{cleaning}
                            </motion.span>

                        ) : (

                            <motion.span
                                key="free"
                                initial={{
                                    scale: 0.5,
                                    opacity: 0,
                                }}
                                animate={{
                                    scale: [0.7, 1.15, 1],
                                    opacity: 1,
                                }}
                                className="
                                    rounded-full
                                    bg-green-100
                                    px-3
                                    py-1
                                    text-sm
                                    font-bold
                                    text-green-700
                                "
                            >
                                FREE
                            </motion.span>

                        )}

                    </AnimatePresence>

                </div>

                <motion.hr
                    initial={{
                        scaleX: 0,
                    }}
                    animate={{
                        scaleX: 1,
                    }}
                    transition={{
                        duration: 0.6,
                    }}
                    className="
                        origin-left
                        border-gray-200
                    "
                />

                {/* Total */}

                <div className="flex items-center justify-between">

                    <span className="text-lg font-bold">
                        Total Monthly Fee
                    </span>

                    <div className="flex flex-col items-end">

                    {offerUnlocked && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: -10,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                            }}
                            className="
                                mb-1
                                text-sm
                                text-gray-400
                                line-through
                            "
                        >

                            ₹{rent + originalCleaning}

                        </motion.div>

                    )}

                    <motion.div
                        key={displayTotal}
                        initial={{
                            scale: 0.8,
                            opacity: 0,
                        }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                        }}
                        className={`
                            flex
                            items-center
                            gap-1
                            text-3xl
                            font-extrabold
                            ${
                                offerUnlocked
                                    ? "text-green-600"
                                    : "text-blue-600"
                            }
                        `}
                    >

                        <IndianRupee size={28} />

                        {displayTotal}

                    </motion.div>

                </div>

                </div>

                {offerUnlocked && (

                    <motion.div

                        initial={{
                            opacity: 0,
                            y: 12,
                        }}

                        animate={{
                            opacity: 1,
                            y: 0,
                        }}

                        transition={{
                            delay: 0.25,
                            duration: 0.5,
                        }}

                        className="
                            rounded-xl
                            border
                            border-green-200
                            bg-green-50
                            px-4
                            py-3
                            text-center
                        "

                    >

                        <p className="text-sm text-green-700">

                            🎉 Congratulations!

                        </p>

                        <p className="mt-1 font-semibold text-green-800">

                            You save ₹{cleaning} every month.

                        </p>

                    </motion.div>

                )}

                {/* Lifetime Badge */}

                <AnimatePresence>

                    {showLifetimeBadge && (

                        <motion.div
                            initial={{
                                opacity: 0,
                                y: 15,
                            }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                scale: [0.92, 1.04, 1],
                            }}
                            exit={{
                                opacity: 0,
                            }}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-2xl
                                bg-green-50
                                p-4
                                text-green-700
                            "
                        >
                            <CheckCircle2 size={24} />

                            <div>

                                <div className="font-semibold">
                                    Lifetime Price Locked
                                </div>

                                <div className="text-sm">
                                    Your ₹2000/month rent
                                    will never increase
                                    while you continue staying.
                                </div>

                            </div>

                        </motion.div>

                    )}

                </AnimatePresence>

            </div>

        </motion.div>
    );
}