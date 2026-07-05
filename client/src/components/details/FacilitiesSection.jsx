import { motion } from "framer-motion";

import FacilityCard from "./FacilityCard";

import { FACILITIES } from "../../constants/facilitiesContent";

export default function FacilitiesSection() {

    return (

        <section id="facilities" className="mt-24">

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

                <p
                    className="
                        uppercase
                        tracking-widest
                        text-blue-600
                        font-semibold
                    "
                >
                    Facilities
                </p>

                <h2
                    className="
                        mt-3
                        text-4xl
                        font-bold
                        text-slate-900
                    "
                >
                    Everything You Need for Comfortable Student Living
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
                    We provide all the essential facilities required by
                    students so they can focus on studies without worrying
                    about day-to-day living.
                </p>

            </motion.div>

            <div
                className="
                    mt-14
                    grid
                    md:grid-cols-2
                    xl:grid-cols-3
                    gap-8
                "
            >

                {FACILITIES.map((facility, index) => (

                    <motion.div

                        key={facility.title}

                        initial={{
                            opacity: 0,
                            y: 40,
                        }}

                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}

                        transition={{
                            delay: index * 0.08,
                            duration: 0.45,
                        }}

                        viewport={{
                            once: true,
                        }}

                    >

                        <FacilityCard {...facility} />

                    </motion.div>

                ))}

            </div>

        </section>

    );

}