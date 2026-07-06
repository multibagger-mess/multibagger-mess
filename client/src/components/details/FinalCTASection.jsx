import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function FinalCTASection() {
    return (
        <section className="mt-24">

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="
                    rounded-[40px]
                    bg-gradient-to-r
                    from-blue-700
                    via-blue-600
                    to-indigo-700
                    text-white
                    px-10
                    py-16
                    text-center
                    shadow-2xl
                "
            >

                <p className="uppercase tracking-[0.25em] text-blue-100">

                    The Multi-Bagger Mess

                </p>

                <h2 className="mt-4 text-5xl font-bold">

                    Ready to Join Us?

                </h2>

                <p className="mt-6 max-w-3xl mx-auto text-blue-100 leading-8">

                    Experience a peaceful and study-friendly environment
                    designed for students near J.K. College.

                </p>

                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">

                    <Link
                        to={ROUTES.REQUEST_ACCESS}
                        className="
                            bg-white
                            text-blue-700
                            px-8
                            py-4
                            rounded-full
                            font-semibold
                            hover:scale-105
                            transition
                        "
                    >
                        Request Access
                    </Link>

                    <Link
                        to={ROUTES.ACCESS_DETAILS}
                        className="
                            border-2
                            border-white
                            px-8
                            py-4
                            rounded-full
                            font-semibold
                            hover:bg-white
                            hover:text-blue-700
                            transition
                        "
                    >
                        View Hostel Details
                    </Link>

                </div>

                <p className="mt-8 text-sm text-blue-200">

                    Already requested access? Use "View Hostel Details"
                    to check your approval status.

                </p>

            </motion.div>

        </section>
    );
}