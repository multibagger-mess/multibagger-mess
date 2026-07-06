import { motion } from "framer-motion";

export default function RuleCard({

    icon,

    color,

    title,

    description,

}) {

    return (

        <motion.div

            whileHover={{
                y: -6,
                scale: 1.02,
            }}

            transition={{
                duration: .25,
            }}

            className="
                bg-white
                rounded-3xl
                p-6
                shadow-lg
                border
                border-slate-200
            "

        >

            <div className="flex items-start gap-4">

                <div
                    className="text-4xl"
                    style={{ color }}
                >
                    {icon}
                </div>

                <div>

                    <h3
                        className="
                            text-xl
                            font-bold
                            text-slate-800
                        "
                    >
                        {title}
                    </h3>

                    <p
                        className="
                            mt-3
                            text-slate-600
                            leading-7
                        "
                    >
                        {description}
                    </p>

                </div>

            </div>

        </motion.div>

    );

}