import { motion } from "framer-motion";
import RuleCard from "./RuleCard";
import { DOS, DONTS } from "../../constants/rulesContent";

export default function RulesSection() {

    return (

        <section id="rules" className="mt-24">

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
                    Community Guidelines
                </p>

                <h2
                    className="
                        mt-3
                        text-4xl
                        font-bold
                        text-slate-900
                    "
                >
                    Hostel Expectations
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
                    These simple guidelines help us maintain a peaceful,
                    safe and study-friendly environment for every resident.
                </p>

            </motion.div>

            <div className="grid lg:grid-cols-2 gap-10 mt-14">

                {/* Expected */}

                <div>

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            mb-8
                        "
                    >

                        <span className="text-4xl">
                            ✅
                        </span>

                        <h3
                            className="
                                text-3xl
                                font-bold
                                text-green-700
                            "
                        >
                            Expected From Residents
                        </h3>

                    </div>

                    <div className="space-y-6">

                        {DOS.map((rule) => (

                            <RuleCard

                                key={rule.title}

                                icon="✔"

                                color="#16a34a"

                                title={rule.title}

                                description={rule.description}

                            />

                        ))}

                    </div>

                </div>

                {/* Not Allowed */}

                <div>

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            mb-8
                        "
                    >

                        <span className="text-4xl">
                            🚫
                        </span>

                        <h3
                            className="
                                text-3xl
                                font-bold
                                text-red-700
                            "
                        >
                            Not Allowed
                        </h3>

                    </div>

                    <div className="space-y-6">

                        {DONTS.map((rule) => (

                            <RuleCard

                                key={rule.title}

                                icon="✖"

                                color="#dc2626"

                                title={rule.title}

                                description={rule.description}

                            />

                        ))}

                    </div>

                </div>

            </div>

        </section>

    );

}