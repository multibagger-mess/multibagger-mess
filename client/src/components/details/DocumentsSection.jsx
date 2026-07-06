import { motion } from "framer-motion";
import DocumentCard from "./DocumentCard";
import { DOCUMENTS } from "../../constants/documentsContent";

export default function DocumentsSection() {

    return (

        <section id="documents" className="mt-24">

            <motion.div

                initial={{ opacity: 0, y: 30 }}

                whileInView={{ opacity: 1, y: 0 }}

                transition={{ duration: .6 }}

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
                    Admission
                </p>

                <h2
                    className="
                        mt-3
                        text-4xl
                        font-bold
                        text-slate-900
                    "
                >
                    Documents Required
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
                    Please keep the following documents ready during admission.
                </p>

            </motion.div>

            <div
                className="
                    mt-14
                    grid
                    md:grid-cols-3
                    gap-8
                "
            >

                {DOCUMENTS.map((doc) => (

                    <DocumentCard

                        key={doc.title}

                        {...doc}

                    />

                ))}

            </div>

            <div
                className="
                    mt-12
                    rounded-3xl
                    bg-blue-50
                    border
                    border-blue-100
                    p-6
                    text-center
                "
            >

                <p className="text-blue-700 font-semibold">

                    📌 Please bring the original documents for verification during admission.

                </p>

            </div>

        </section>

    );

}