import { motion } from "framer-motion";

export default function GalleryCard({

    image,

    title,

    onClick,

}) {

    return (

        <motion.div

            whileHover={{

                scale: 1.03,

                y: -6,

            }}

            transition={{

                duration: .25,

            }}

            onClick={onClick}

            className="

                relative

                overflow-hidden

                rounded-3xl

                cursor-pointer

                shadow-lg

                group

            "

        >

            <img

                src={image}

                alt={title}

                className="

                    w-full

                    h-72

                    object-cover

                    transition-all

                    duration-500

                    group-hover:scale-110

                "

            />

            <div

                className="

                    absolute

                    inset-0

                    bg-gradient-to-t

                    from-black/80

                    via-transparent

                    to-transparent

                "

            />

            <div

                className="

                    absolute

                    bottom-6

                    left-6

                    text-white

                "

            >

                <h3

                    className="

                        text-2xl

                        font-bold

                    "

                >

                    {title}

                </h3>

            </div>

        </motion.div>

    );

}