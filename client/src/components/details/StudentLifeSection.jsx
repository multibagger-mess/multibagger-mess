import { motion } from "framer-motion";

import StudentLifeCard from "./StudentLifeCard";
import { STUDENT_LIFE } from "../../constants/studentLifeContent";

export default function StudentLifeSection() {

    return (

        <section id="student-life" className="mt-24">

            <motion.div

                initial={{ opacity: 0, y: 30 }}

                whileInView={{ opacity: 1, y: 0 }}

                transition={{ duration: 0.6 }}

                viewport={{ once: true }}

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
                    Why Choose Us
                </p>

                <h2
                    className="
                        mt-3
                        text-4xl
                        font-bold
                        text-slate-900
                    "
                >
                    Why Students Choose
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
                    More than just accommodation,
                    we strive to provide students
                    with a peaceful, disciplined and
                    study-friendly environment.
                </p>

            </motion.div>

            <div
                className="
                    mt-14
                    grid
                    md:grid-cols-2
                    gap-8
                "
            >

                {STUDENT_LIFE.map((item, index) => (

                    <motion.div

                        key={item.title}

                        initial={{
                            opacity: 0,
                            y: 40,
                        }}

                        whileInView={{
                            opacity: 1,
                            y: 0,
                        }}

                        transition={{
                            delay: index * 0.15,
                            duration: 0.45,
                        }}

                        viewport={{
                            once: true,
                        }}

                    >

                        <StudentLifeCard {...item} />

                    </motion.div>

                ))}

            </div>

        </section>

    );

}