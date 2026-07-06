import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQItem({
    question,
    answer,
}) {

    const [open, setOpen] = useState(false);

    return (

        <div
            className="
                bg-white
                rounded-2xl
                border
                border-slate-200
                shadow-md
            "
        >

            <button

                onClick={() => setOpen(!open)}

                className="
                    w-full
                    flex
                    justify-between
                    items-center
                    p-6
                    text-left
                    cursor-pointer
                "

            >

                <span className="font-semibold text-lg">

                    {question}

                </span>

                <motion.div

                    animate={{
                        rotate: open ? 180 : 0,
                    }}

                >

                    <ChevronDown />

                </motion.div>

            </button>

            <AnimatePresence>

                {open && (

                    <motion.div

                        initial={{
                            height: 0,
                            opacity: 0,
                        }}

                        animate={{
                            height: "auto",
                            opacity: 1,
                        }}

                        exit={{
                            height: 0,
                            opacity: 0,
                        }}

                        className="overflow-hidden"

                    >

                        <p
                            className="
                                px-6
                                pb-6
                                text-slate-600
                                leading-7
                            "
                        >

                            {answer}

                        </p>

                    </motion.div>

                )}

            </AnimatePresence>

        </div>

    );

}