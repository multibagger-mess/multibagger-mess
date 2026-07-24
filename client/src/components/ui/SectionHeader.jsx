import { motion } from "framer-motion";

export default function SectionHeader({
    badge,
    title,
    description,
    badgeClassName = "",
}) {

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 30,
            }}

            whileInView={{
                opacity: 1,
                y: 0,
            }}

            transition={{
                duration: 0.6,
            }}

            viewport={{
                once: true,
            }}

            className="text-center"
        >

            {badge && (

                <div
                    className={`
                        inline-flex
                        items-center
                        gap-2
                        px-4
                        py-2
                        rounded-full
                        font-semibold
                        mb-6
                        text-sm
                        sm:text-base
                        ${badgeClassName}
                    `}
                >
                    {badge}
                </div>

            )}

            <h2
                className="
                    text-3xl
                    sm:text-4xl
                    lg:text-5xl
                    font-bold
                    text-slate-800
                    mb-4
                "
            >
                {title}
            </h2>

            <p
                className="
                    text-slate-500
                    text-base
                    sm:text-lg
                    max-w-3xl
                    mx-auto
                    mb-8
                    leading-relaxed
                "
            >
                {description}
            </p>

        </motion.div>

    );

}