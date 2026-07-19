import { AnimatePresence, motion } from "framer-motion";
import { Gift } from "lucide-react";

export default function OfferRibbon({ visible }) {
    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{
                        opacity: 0,
                        y: -50,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    exit={{
                        opacity: 0,
                        y: -50,
                    }}
                    transition={{
                        duration: 0.6,
                        type: "spring",
                    }}
                    className="
                        mb-8
                        flex
                        justify-center
                    "
                >
                    <div
                        className="
                            inline-flex
                            items-center
                            gap-3
                            rounded-full
                            bg-gradient-to-r
                            from-yellow-400
                            via-yellow-300
                            to-amber-400
                            px-6
                            py-3
                            shadow-lg
                        "
                    >
                        <Gift size={22} className="text-white" />

                        <span
                            className="
                                font-bold
                                tracking-wide
                                text-white
                            "
                        >
                            🎉 INAUGURAL OFFER UNLOCKED
                        </span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}