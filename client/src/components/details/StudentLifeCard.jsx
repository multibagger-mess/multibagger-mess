import { motion } from "framer-motion";

export default function StudentLifeCard({
    icon,
    title,
    description,
}) {
    return (
        <motion.div
            whileHover={{
                y: -8,
                scale: 1.03,
            }}
            transition={{
                duration: 0.25,
            }}
            className="
                bg-white
                rounded-3xl
                shadow-lg
                border
                border-slate-200
                p-8
                h-full
            "
        >
            <div className="text-5xl">
                {icon}
            </div>

            <h3
                className="
                    mt-6
                    text-2xl
                    font-bold
                    text-slate-800
                "
            >
                {title}
            </h3>

            <p
                className="
                    mt-4
                    text-slate-600
                    leading-7
                "
            >
                {description}
            </p>
        </motion.div>
    );
}