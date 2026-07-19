import { motion } from "framer-motion";
import { Gift, Sparkles, ShieldCheck } from "lucide-react";

export default function LifetimeOfferCard({ offerUnlocked }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="
                overflow-hidden
                rounded-3xl
                border
                border-amber-200
                bg-gradient-to-br
                from-yellow-50
                via-white
                to-amber-50
                shadow-xl
            "
        >
            {/* Header */}

            <div className="flex items-center gap-3 border-b border-amber-200 bg-amber-100/60 px-6 py-5">
                <Gift className="text-amber-600" size={28} />

                <div>
                    <h2 className="text-xl font-bold text-amber-800">
                        Inaugural Offer
                    </h2>

                    <p className="text-sm text-amber-700">
                        Exclusive for the first 10 occupants.
                    </p>
                </div>
            </div>

            {/* Body */}

            <div className="space-y-5 p-6">

                <div className="flex items-start gap-3">

                    <Sparkles
                        size={22}
                        className="mt-1 text-yellow-500"
                    />

                    <p className="leading-7 text-gray-700">
                        As one of our first residents, your
                        <strong> monthly cleaning fee is permanently waived.</strong>
                    </p>

                </div>

                <div className="flex items-start gap-3">

                    <ShieldCheck
                        size={22}
                        className="mt-1 text-green-600"
                    />

                    <p className="leading-7 text-gray-700">
                        As long as you continue staying with us,
                        your monthly payment remains
                        <strong> ₹2000 forever.</strong>
                    </p>

                </div>

                <motion.div
                    animate={
                        offerUnlocked
                            ? {
                                  scale: [1, 1.05, 1],
                              }
                            : {}
                    }
                    transition={{
                        duration: 1.2,
                        repeat: Infinity,
                    }}
                    className="
                        rounded-2xl
                        bg-gradient-to-r
                        from-green-600
                        to-emerald-500
                        p-5
                        text-white
                    "
                >
                    <div className="text-lg font-bold">
                        Lifetime Benefit
                    </div>

                    <div className="mt-2 text-sm leading-6 opacity-95">
                        No monthly cleaning charges for as long as
                        you stay in the hostel.
                    </div>
                </motion.div>

            </div>
        </motion.div>
    );
}