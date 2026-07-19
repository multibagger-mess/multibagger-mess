import { motion } from "framer-motion";
import { TrendingDown, Wallet, Sparkles } from "lucide-react";

export default function SavingsCard({
    rent,
    cleaning,
    offerUnlocked,
}) {
    const yearlySavings = cleaning * 12;

    return (
        <motion.div
            initial={{
                opacity: 0,
                y: 20,
            }}
            animate={{
                opacity: 1,
                y: 0,
            }}
            transition={{
                duration: 0.5,
                delay: 0.25,
            }}
            className="
                overflow-hidden
                rounded-3xl
                border
                border-emerald-200
                bg-gradient-to-br
                from-emerald-50
                via-white
                to-green-50
                shadow-xl
            "
        >
            {/* Header */}

            <div className="flex items-center gap-3 border-b border-emerald-200 bg-emerald-100/60 px-6 py-5">

                <TrendingDown
                    size={28}
                    className="text-emerald-700"
                />

                <div>

                    <h2 className="text-xl font-bold text-emerald-800">
                        Your Savings
                    </h2>

                    <p className="text-sm text-emerald-700">
                        Value of joining early
                    </p>

                </div>

            </div>

            {/* Body */}

            <div className="space-y-5 p-6">

                <div className="flex items-start gap-3">

                    <Wallet
                        size={22}
                        className="mt-1 text-green-600"
                    />

                    <div>

                        <p className="font-semibold">
                            Monthly Payment
                        </p>

                        <p className="text-gray-600">
                            ₹{rent}/month
                        </p>

                    </div>

                </div>

                <div className="flex items-start gap-3">

                    <Sparkles
                        size={22}
                        className="mt-1 text-yellow-500"
                    />

                    <div>

                        <p className="font-semibold">
                            Cleaning Fee Saved
                        </p>

                        <p className="text-gray-600">
                            ₹{cleaning} every month
                        </p>

                    </div>

                </div>

                <motion.div
                    animate={
                        offerUnlocked
                            ? {
                                  scale: [1, 1.04, 1],
                              }
                            : {}
                    }
                    transition={{
                        duration: 1.4,
                        repeat: Infinity,
                    }}
                    className="
                        rounded-2xl
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        p-6
                        text-center
                        text-white
                    "
                >
                    <div className="text-sm uppercase tracking-wider opacity-90">
                        Estimated Annual Savings
                    </div>

                    <div className="mt-2 text-4xl font-extrabold">
                        ₹{yearlySavings}
                    </div>

                    <div className="mt-2 text-sm opacity-90">
                        Saved every year while you stay.
                    </div>

                </motion.div>

            </div>
        </motion.div>
    );
}