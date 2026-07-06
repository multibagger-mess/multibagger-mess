import { motion } from "framer-motion";
import FAQItem from "./FAQItem";
import { FAQS } from "../../constants/faqContent";

export default function FAQSection() {

    return (

        <section id="faq" className="mt-24">

            <motion.div

                initial={{ opacity: 0, y: 30 }}

                whileInView={{ opacity: 1, y: 0 }}

                transition={{ duration: .6 }}

                viewport={{ once: true }}

                className="text-center"

            >

                <p className="uppercase tracking-widest text-blue-600 font-semibold">

                    Frequently Asked Questions

                </p>

                <h2 className="mt-3 text-4xl font-bold text-slate-900">

                    Have Questions?

                </h2>

                <p className="mt-5 max-w-3xl mx-auto text-slate-600 leading-8">

                    Here are answers to the questions students and parents ask most often.

                </p>

            </motion.div>

            <div className="mt-14 max-w-4xl mx-auto space-y-5">

                {FAQS.map((faq) => (

                    <FAQItem

                        key={faq.question}

                        {...faq}

                    />

                ))}

            </div>

        </section>

    );

}