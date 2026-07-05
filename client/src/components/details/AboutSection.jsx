import { Building2, GraduationCap, HeartHandshake } from "lucide-react";

export default function AboutSection() {
    return (
        <section
            className="
                mt-12
                bg-white
                rounded-3xl
                shadow-lg
                p-8
                border
                border-slate-100
            "
        >

            <div className="flex items-center gap-3">

                <Building2
                    className="text-blue-600"
                    size={32}
                />

                <h2 className="text-3xl font-bold text-slate-900">

                    About The Multi-Bagger Mess

                </h2>

            </div>

            <p
                className="
                    mt-6
                    text-slate-600
                    leading-8
                    text-lg
                "
            >

                The Multi-Bagger Mess is a peaceful boys' hostel
                located near J.K. College, Purulia.

                Our objective is to provide students with a
                clean, disciplined and study-friendly
                environment where they can comfortably live,
                focus on academics and achieve their goals.

            </p>

            <div
                className="
                    grid
                    md:grid-cols-3
                    gap-6
                    mt-10
                "
            >

                <div
                    className="
                        rounded-2xl
                        bg-blue-50
                        p-6
                    "
                >

                    <GraduationCap
                        className="text-blue-600"
                        size={34}
                    />

                    <h3 className="mt-4 font-semibold text-xl">

                        Student Friendly

                    </h3>

                    <p className="mt-3 text-slate-600">

                        Designed especially for students preparing
                        for college studies and competitive exams.

                    </p>

                </div>

                <div
                    className="
                        rounded-2xl
                        bg-blue-50
                        p-6
                    "
                >

                    <Building2
                        className="text-blue-600"
                        size={34}
                    />

                    <h3 className="mt-4 font-semibold text-xl">

                        Prime Location

                    </h3>

                    <p className="mt-3 text-slate-600">

                        Located very close to J.K. College with
                        essential shops, pharmacy and transport
                        nearby.

                    </p>

                </div>

                <div
                    className="
                        rounded-2xl
                        bg-blue-50
                        p-6
                    "
                >

                    <HeartHandshake
                        className="text-blue-600"
                        size={34}
                    />

                    <h3 className="mt-4 font-semibold text-xl">

                        Comfortable Living

                    </h3>

                    <p className="mt-3 text-slate-600">

                        A clean, peaceful and secure atmosphere
                        where every resident feels comfortable.

                    </p>

                </div>

            </div>

        </section>
    );
}