import { motion } from "framer-motion";

import DetailsGallery from "./DetailsGallery";

export default function GallerySection() {
    return (

        <section
            id="gallery"
            className="mt-24"
        >

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
                    duration: .6,
                }}

                viewport={{
                    once: true,
                }}

                className="text-center"

            >

                <p
                    className="
                        uppercase
                        tracking-widest
                        text-blue-600
                        font-semibold
                    "
                >
                    Hostel Gallery
                </p>

                <h2
                    className="
                        mt-3
                        text-4xl
                        font-bold
                        text-slate-900
                    "
                >
                    Take a Look Inside
                    <br />
                    The Multi-Bagger Mess
                </h2>

                <p
                    className="
                        mt-5
                        max-w-3xl
                        mx-auto
                        text-slate-600
                        leading-8
                    "
                >
                    Browse real photographs of our hostel and get a feel
                    for the peaceful environment, clean rooms and
                    student-friendly atmosphere before you visit.
                </p>

            </motion.div>

            <div className="mt-14">

                <DetailsGallery />

            </div>

        </section>

    );
}