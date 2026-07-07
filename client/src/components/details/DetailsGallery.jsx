import { useState } from "react";

import Lightbox from "yet-another-react-lightbox";

import "yet-another-react-lightbox/styles.css";

import { motion } from "framer-motion";

import room11 from "../../assets/images/details/room1-1.png";
import room12 from "../../assets/images/details/room1-2.png";

import room21 from "../../assets/images/details/room2-1.png";
import room22 from "../../assets/images/details/room2-2.png";

import room31 from "../../assets/images/details/room3-1.png";
import room32 from "../../assets/images/details/room3-2.png";

import room41 from "../../assets/images/details/room4-1.png";
import room42 from "../../assets/images/details/room4-2.png";

const rooms = [
    {
        title: "Room 1",
        images: [room11, room12],
    },
    {
        title: "Room 2",
        images: [room21, room22],
    },
    {
        title: "Room 3",
        images: [room31, room32],
    },
    {
        title: "Room 4",
        images: [room41, room42],
    },
];

export default function DetailsGallery() {

        const [open, setOpen] = useState(false);

        const [slides, setSlides] = useState([]);

        const [index, setIndex] = useState(0);

            return (
                <>

                <div className="space-y-20">

                    {rooms.map((room, roomIndex) => (

                        <motion.div

                            key={roomIndex}

                            initial={{
                                opacity: 0,
                                y: 30,
                            }}

                            whileInView={{
                                opacity: 1,
                                y: 0,
                            }}

                            viewport={{
                                once: true,
                            }}

                            transition={{
                                duration: .6,
                            }}

                        >

                            <h3
                                className="
                                    text-3xl
                                    font-bold
                                    text-slate-900
                                    mb-8
                                "
                            >

                                {room.title}

                            </h3>

                            <p
                                className="
                                    text-slate-500
                                    mb-8
                                    mt-2
                                    leading-7
                                "
                            >
                                {room.description}
                            </p>

                            <div
                                className="
                                    grid
                                    md:grid-cols-2
                                    gap-6
                                "
                            >

                                {room.images.map((image, i) => (

                                    <div

                                        key={i}

                                        className="
                                            relative
                                            overflow-hidden
                                            rounded-3xl
                                            shadow-xl
                                            group
                                        "

                                    >

                                        <img
                                                src={image}
                                                alt={`${room.title} ${i + 1}`}

                                                onClick={() => {

                                                    setSlides(

                                                        room.images.map((img) => ({
                                                            src: img,
                                                        }))

                                                    );

                                                    setIndex(i);

                                                    setOpen(true);

                                                }}

                                                className="
                                            w-full
                                            h-[500px]
                                            object-cover
                                            cursor-pointer
                                            transition-all
                                            duration-700
                                            group-hover:scale-110
                                            group-hover:brightness-105
                                            "
                                            />

                                            <div
                                                className="
                                                    absolute
                                                    inset-0
                                                    bg-gradient-to-t
                                                    from-black/40
                                                    via-transparent
                                                    to-transparent
                                                    opacity-0
                                                    group-hover:opacity-100
                                                    transition
                                                    duration-500
                                                    pointer-events-none
                                                "
                                            ></div>

                                            <div
                                                className="
                                                    absolute
                                                    bottom-5
                                                    left-5
                                                    text-white
                                                    font-semibold
                                                    opacity-0
                                                    group-hover:opacity-100
                                                    transition
                                                    duration-500
                                                    pointer-events-none
                                                "
                                            >

                                                🔍 Click to enlarge

                                            </div>

                                    </div>

                                ))}

                            </div>

                        </motion.div>

                    ))}

                </div>

                        <Lightbox
                            open={open}
                            close={() => setOpen(false)}
                            slides={slides}
                            index={index}
                        />

    </>
);

}

