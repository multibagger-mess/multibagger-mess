import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

import hostel1 from "../../assets/images/hostel1.png";
import hostel2 from "../../assets/images/hostel2.png";
import hostel3 from "../../assets/images/hostel3.png";
import hostel4 from "../../assets/images/hostel4.png";

const images = [
    hostel1,
    hostel2,
    hostel3,
    hostel4,
];

export default function HostelGallery() {

    const [current, setCurrent] = useState(0);
const [isPaused, setIsPaused] = useState(false);

useEffect(() => {

    if (isPaused) return;

    const timer = setInterval(() => {

        setCurrent((prev) =>
            prev === images.length - 1
                ? 0
                : prev + 1
        );

    }, 3000);

    return () => clearInterval(timer);

}, [isPaused]);

    return (

        <div className="w-full">

            {/* Main Image */}

            <div
    onMouseEnter={() => setIsPaused(true)}
    onMouseLeave={() => setIsPaused(false)}
    className="
        relative
        w-full
        h-[520px]
        lg:h-[620px]
        rounded-3xl
        overflow-hidden
        shadow-2xl
    "
>

                <AnimatePresence mode="wait">

    <motion.img

        key={current}

        src={images[current]}

        alt="Hostel"

        initial={{
            opacity: 0,
            scale: 1.04,
        }}

        animate={{
            opacity: 1,
            scale: 1.08,
        }}

        exit={{
            opacity: 0,
            scale: 1.02,
        }}

        transition={{
            duration: 1.1,
            ease: "easeInOut",
        }}

        className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
        "

    />

</AnimatePresence>

            </div>

            {/* Thumbnail Strip */}

            <div
                className="
                    mt-5
                    grid
                    grid-cols-4
                    gap-4
                "
            >

                {images.map((image, index) => (

                    <div
    key={index}
    onClick={() => setCurrent(index)}
    className={`
        rounded-2xl
        overflow-hidden
        cursor-pointer
        shadow-md
        hover:shadow-xl
        transition-all
        duration-300
        hover:scale-105
        ${
            current === index
                ? "ring-4 ring-blue-600 scale-105"
                : ""
        }
    `}
>

                        <img
                            src={image}
                            alt=""
                            className="
                                w-full
                                h-28
                                object-cover
                            "
                        />

                    </div>

                ))}

            </div>

            <p
                className="
                    text-center
                    mt-4
                    text-sm
                    italic
                    text-slate-400
                "
            >
                * Hostel accommodation is available on the ground floor only.
            </p>

        </div>

    );

}
