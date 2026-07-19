import { motion } from "framer-motion";
import {
    Lock,
    Sparkles,
    Gift,
    IndianRupee,
} from "lucide-react";

export default function LockedOfferPlaceholder() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
                relative
                overflow-hidden
                rounded-3xl
                border-2
                border-amber-200
                bg-gradient-to-br
                from-amber-50
                via-white
                to-yellow-50
                p-8
                shadow-xl
            "
        >
            {/* Animated shimmer */}

            <motion.div
                animate={{
                    x: ["-120%", "220%"],
                }}
                transition={{
                    repeat: Infinity,
                    duration: 2.8,
                    ease: "linear",
                }}
                className="
                    absolute
                    top-0
                    left-0
                    h-full
                    w-24
                    rotate-12
                    bg-white/40
                    blur-xl
                "
            />

            <div className="relative z-10 text-center">

                <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">

                    <Lock
                        size={40}
                        className="text-amber-600"
                    />

                </div>

                <h2 className="text-2xl font-bold text-gray-900">
                    Exclusive Inaugural Offer
                </h2>

                <p className="mt-3 text-gray-600">
                    Reveal both pricing cards to unlock your
                    special founder pricing.
                </p>

                <div className="mt-8 grid gap-4 md:grid-cols-3">

                    <div className="rounded-2xl bg-white p-5 shadow">

                        <IndianRupee
                            className="mx-auto text-blue-600"
                            size={30}
                        />

                        <div className="mt-3 font-semibold">
                            Lifetime Founder Price
                        </div>

                        <div className="text-sm text-gray-500">
                            Reveal your special price
                        </div>

                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow">

                        <Gift
                            className="mx-auto text-green-600"
                            size={30}
                        />

                        <div className="mt-3 font-semibold">
                            Cleaning Benefit
                        </div>

                        <div className="text-sm text-gray-500">
                            Unlock to reveal
                        </div>

                    </div>

                    <div className="rounded-2xl bg-white p-5 shadow">

                        <Sparkles
                            className="mx-auto text-yellow-500"
                            size={30}
                        />

                        <div className="mt-3 font-semibold">
                            Premium Benefits
                        </div>

                        <div className="text-sm text-gray-500">
                            Waiting to be unlocked
                        </div>

                    </div>

                </div>

                <motion.div
                    animate={{
                        opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.8,
                    }}
                    className="
                        mt-8
                        rounded-full
                        bg-amber-100
                        px-6
                        py-3
                        font-semibold
                        text-amber-700
                    "
                >
                    🔓 Scratch both cards above to continue
                </motion.div>

            </div>

        </motion.div>
    );
}