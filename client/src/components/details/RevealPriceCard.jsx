import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function RevealPriceCard({
    icon,
    title,
    subtitle,
    amount,
    color = "#2563eb",
    onReveal,
}) {

    const [progress, setProgress] = useState(0);
    const [revealed, setRevealed] = useState(false);

    const handleMove = () => {

        if (revealed) return;

        const next = Math.min(progress + 2, 100);

        setProgress(next);

        if (next >= 100) {

            setRevealed(true);

            if (onReveal) {

                onReveal();

            }

        }

    };

    return (

        <motion.div

            whileHover={{
                y: -6,
            }}

            transition={{
                duration: .25,
            }}

            className="
                bg-white
                rounded-3xl
                shadow-xl
                border
                border-slate-200
                overflow-hidden
            "
        >

            <div className="p-8">

                <div className="flex items-center gap-3">

                    <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center"
                        style={{
                            background: `${color}15`,
                            color,
                        }}
                    >

                        {icon}

                    </div>

                    <div>

                        <h3
                            className="
                                text-2xl
                                font-bold
                                text-slate-800
                            "
                        >
                            {title}
                        </h3>

                        <p
                            className="
                                text-slate-500
                                text-sm
                            "
                        >
                            {subtitle}
                        </p>

                    </div>

                </div>

                <div

                    onMouseMove={handleMove}
                    onTouchMove={handleMove}

                    className="
                        mt-8
                        rounded-3xl
                        h-56
                        cursor-pointer
                        select-none
                        relative
                        overflow-hidden
                        flex
                        items-center
                        justify-center
                    "

                    style={{

                        background: revealed

                            ? "#ffffff"

                            : "linear-gradient(135deg,#d9dce5,#bcc5d6)",

                    }}

                >

                    {!revealed && (

                        <motion.div

                            animate={{
                                opacity: [.35, 1, .35],
                            }}

                            transition={{
                                repeat: Infinity,
                                duration: 2,
                            }}

                            className="
                                absolute
                                inset-0
                                bg-white/20
                            "
                        />

                    )}

                    {!revealed ? (

                        <div className="text-center px-6">

                            <Sparkles
                                size={42}
                                className="mx-auto text-slate-700"
                            />

                            <p
                                className="
                                    mt-4
                                    text-2xl
                                    font-bold
                                    text-slate-700
                                "
                            >
                                Scratch the Card
                            </p>

                            <p
                                className="
                                    mt-2
                                    text-slate-500
                                "
                            >
                                Swipe your finger or move your mouse to reveal the amount.
                            </p>

                        </div>

                    ) : (

                        <motion.div

                            initial={{
                                scale: .8,
                                opacity: 0,
                            }}

                            animate={{
                                scale: 1,
                                opacity: 1,
                            }}

                            transition={{
                                duration: .45,
                            }}

                            className="text-center"

                        >

                            <p
                                className="
                                    text-slate-500
                                "
                            >
                                Monthly Amount
                            </p>

                            <h2

                                className="
                                    text-6xl
                                    font-black
                                    mt-3
                                "

                                style={{
                                    color,
                                }}

                            >

                                ₹{amount}

                            </h2>

                            <p
                                className="
                                    mt-4
                                    text-green-600
                                    font-semibold
                                "
                            >
                                ✓ Revealed
                            </p>

                        </motion.div>

                    )}

                </div>

                {!revealed && (

                    <>

                        <div
                            className="
                                mt-8
                                h-3
                                bg-slate-200
                                rounded-full
                            "
                        >

                            <motion.div

                                className="h-full rounded-full"

                                style={{
                                    background: color,
                                }}

                                animate={{
                                    width: `${progress}%`,
                                }}

                            />

                        </div>

                        <p
                            className="
                                mt-3
                                text-center
                                text-slate-500
                            "
                        >

                            {progress}% Revealed

                        </p>

                    </>

                )}

            </div>

        </motion.div>

    );

}