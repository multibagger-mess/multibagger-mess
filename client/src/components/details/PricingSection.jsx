import { useState } from "react";

import { Home, BrushCleaning } from "lucide-react";

import RevealPriceCard from "./RevealPriceCard";
import PaymentSummaryCard from "./PaymentSummaryCard";

import { DETAILS_CONTENT } from "../../constants/detailsContent";

export default function PricingSection() {

    const [rentRevealed, setRentRevealed] = useState(false);

    const [cleaningRevealed, setCleaningRevealed] = useState(false);

    return (

        <section className="mt-16">

            {/* Heading */}

            <div className="text-center">

                <h2 className="text-4xl font-bold text-slate-900">

                    Monthly Fee Breakdown

                </h2>

                <p className="mt-4 text-slate-600 max-w-2xl mx-auto">

                   We believe in complete transparency.

                   Your monthly fee consists of the accommodation charges and the monthly cleaning service charge.

                   There are absolutely no hidden charges.
                </p>

            </div>

            {/* Cards */}

            <div

                className="

                    mt-14

                    grid

                    lg:grid-cols-2

                    gap-10

                    items-start

                "

            >

                <RevealPriceCard

                    icon={<Home size={28} />}

                    title={DETAILS_CONTENT.pricing.rent.title}

                    subtitle={DETAILS_CONTENT.pricing.rent.subtitle}

                    amount={DETAILS_CONTENT.pricing.rent.amount}

                    color="#2563eb"

                    onReveal={() => setRentRevealed(true)}

                />

                <RevealPriceCard

                    icon={<BrushCleaning size={28} />}

                    title={DETAILS_CONTENT.pricing.cleaning.title}

                    subtitle={DETAILS_CONTENT.pricing.cleaning.subtitle}

                    amount={DETAILS_CONTENT.pricing.cleaning.amount}

                    color="#16a34a"

                    onReveal={() => setCleaningRevealed(true)}

                />

            </div>

            {/* Summary */}

            <PaymentSummaryCard

                key={`${rentRevealed}-${cleaningRevealed}`}

                rentRevealed={rentRevealed}

                cleaningRevealed={cleaningRevealed}

                rent={DETAILS_CONTENT.pricing.rent.amount}

                cleaning={DETAILS_CONTENT.pricing.cleaning.amount}
                
            />

        </section>

    );

}