import { motion } from "framer-motion";
import {
    COMPONENTS,
    CARD_VARIANTS,
    ICON_VARIANTS,
} from "../../theme";

export default function AvailabilityCard({
    title,
    value,
    subtitle,
    icon,
    color = "green",
    delay = 0,
}) {

    const variant = CARD_VARIANTS[color];

    const iconVariant = ICON_VARIANTS[color];

    const Icon = icon;

    return (

        <motion.div

            initial={{
                opacity: 0,
                y: 40,
            }}

            whileInView={{
                opacity: 1,
                y: 0,
            }}

            whileHover={{
                y: -8,
                transition: {
                    type: "tween",
                    ease: "linear",
                    duration: 0.12,
                },
            }}

            transition={{
                opacity: {
                    duration: 0.5,
                    delay,
                },
                y: {
                    type: "tween",
                    duration: 0.12,
                    ease: "linear",
                },
            }}

            viewport={{
                once: true,
            }}

            className={`
                ${COMPONENTS.card.medium}
                ${variant.card}
                text-center
                cursor-default
                shadow-lg
                transition-all
                duration-300
            `}
        >

                        <div
                className={`
                    w-[70px]
                    h-[70px]
                    mx-auto
                    rounded-full
                    flex
                    items-center
                    justify-center
                    ${iconVariant.circle}
                `}
            >

                <Icon
                    size={34}
                    className={iconVariant.icon}
                />

            </div>

            <h3 className="mt-4 font-semibold text-slate-800">
                {title}
            </h3>

            <h1 className={`mt-4 text-6xl font-bold ${variant.value}`}>
                {value}
            </h1>

            <p className="mt-4 text-slate-500">
                {subtitle}
            </p>

        </motion.div>

    );
}