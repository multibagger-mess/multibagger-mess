import { motion } from "framer-motion";
import { Flame, Users } from "lucide-react";

export default function FounderSlotsCard({
    remainingSlots,
    totalSlots,
}) {

    const percentage =
        (remainingSlots / totalSlots) * 100;
    
    const founderOfferActive = remainingSlots > 0;

        let statusColor = "text-green-600";
let progressColor = "from-green-500 to-emerald-400";
let statusMessage = "Founder slots are widely available.";

if (remainingSlots <= 6) {
    statusColor = "text-amber-600";
    progressColor = "from-amber-500 to-yellow-400";
    statusMessage = "Founder slots are filling quickly.";
}

if (remainingSlots <= 3) {
    statusColor = "text-red-600";
    progressColor = "from-red-500 to-orange-500";
    statusMessage = "Hurry! Only a few founder slots remain.";
}

if (remainingSlots === 0) {
    statusColor = "text-gray-600";
    progressColor = "from-gray-400 to-gray-500";
    statusMessage = "Founder offer has ended.";
}

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="
                rounded-2xl
                border
                border-orange-200
                bg-gradient-to-r
                from-orange-50
                via-white
                to-amber-50
                p-5
                shadow-lg
            "
        >
            <div className="flex items-center gap-3">

                <div className="rounded-full bg-orange-100 p-3">

                    <Flame
                        className="text-orange-600"
                        size={24}
                    />

                </div>

                <div>

                    <h3 className="font-bold text-lg">
                        {founderOfferActive
                            ? "Founder Offer"
                            : "Founder Offer Closed"}
                    </h3>

                    <p className="text-sm text-gray-600">
                        {founderOfferActive
                            ? "First 10 occupants get lifetime founder pricing."
                            : "All founder slots have been successfully claimed."}
                    </p>

                </div>

            </div>

            <div className="mt-6 flex items-center justify-between">

                <div className="flex items-center gap-2">

                    <Users
                        size={20}
                        className="text-gray-500"
                    />

                    <span className="text-gray-700">
                        Slots Remaining
                    </span>

                </div>

                <span className="text-3xl font-extrabold text-orange-600">
                    {remainingSlots}/{totalSlots}
                </span>

            </div>

            {/* Progress Bar */}

            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="mt-5"
            >

                <div className="h-3 w-full overflow-hidden rounded-full bg-orange-100">

                    <motion.div

                        initial={{
                            width: 0,
                        }}

                        animate={{
                            width: `${percentage}%`,
                        }}

                        transition={{
                            duration: 1,
                        }}

                        className={`
                            h-full
                            rounded-full
                            bg-gradient-to-r
                            ${progressColor}
                        `}

                    />

                </div>

            </motion.div>

            <div className="mt-4 text-center">

                <p className={`font-semibold ${statusColor}`}>
                    {statusMessage}
                </p>

                {founderOfferActive ? (
                    <p className="mt-2 text-sm text-gray-600">
                        Be among the first residents and lock your

                        <span className="font-semibold text-orange-700">
                            {" "}₹2000/month founder price{" "}
                        </span>

                        forever.
                    </p>
                ) : (
                    <p className="mt-2 text-sm text-gray-600">
                        Current pricing applies to all new admissions.
                    </p>
                )}

            </div>

        </motion.div>
    );
}