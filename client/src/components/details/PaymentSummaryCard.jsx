import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import confetti from "canvas-confetti";

import OfferRibbon from "./paymentSummary/OfferRibbon";
import PaymentBreakdown from "./paymentSummary/PaymentBreakdown";
import LifetimeOfferCard from "./paymentSummary/LifetimeOfferCard";
import FounderSlotsCard from "./paymentSummary/FounderSlotsCard";
import SavingsCard from "./paymentSummary/SavingsCard";
import LockedOfferPlaceholder from "./paymentSummary/LockedOfferPlaceholder";
import occupantService from "../../services/occupantService";

export default function PaymentSummaryCard({
    rentRevealed,
    cleaningRevealed,
    rent,
    cleaning,
}) {
    const ready = rentRevealed && cleaningRevealed;

    const originalTotal = rent + cleaning;

    const [displayTotal, setDisplayTotal] = useState(originalTotal);

    const [offerUnlocked, setOfferUnlocked] = useState(false);

    const [showRibbon, setShowRibbon] = useState(false);

    const [showLifetimeBadge, setShowLifetimeBadge] = useState(false);
    
    const [showPlaceholder, setShowPlaceholder] = useState(true);

    const [showPaymentSummary, setShowPaymentSummary] = useState(false);

    const [showLifetimeOffer, setShowLifetimeOffer] = useState(false);

    const [showFounderSlots, setShowFounderSlots] = useState(false);

    const [showSavingsCard, setShowSavingsCard] = useState(false);

    const [remainingFounderSlots, setRemainingFounderSlots] =
    useState(10);

    const [totalFounderSlots, setTotalFounderSlots] =
        useState(10);

    const founderOfferActive = remainingFounderSlots > 0;

    const effectiveCleaning = founderOfferActive ? 0 : cleaning;

    const effectiveTotal = rent + effectiveCleaning;

useEffect(() => {
    if (!ready) {
        setOfferUnlocked(false);

        setDisplayTotal(effectiveTotal);

        setShowRibbon(false);

        setShowLifetimeBadge(false);

        setShowPlaceholder(true);

        setShowPaymentSummary(false);

        setShowLifetimeOffer(false);

        setShowFounderSlots(false);

        setShowSavingsCard(false);
    }
}, [ready, effectiveTotal]);

    useEffect(() => {
        if (!ready || offerUnlocked) return;

        const timer = setTimeout(() => {
                setOfferUnlocked(true);

                // Keep placeholder visible briefly after scratching

                setTimeout(() => {
                    setShowPlaceholder(false);
                }, 200);

                if (founderOfferActive) {
                    setTimeout(() => {
                        setShowRibbon(true);
                    }, 300);
                }

                setTimeout(() => {
                    setShowPaymentSummary(true);
                }, 450);

                if (founderOfferActive) {
                    setTimeout(() => {
                        setShowLifetimeOffer(true);
                    }, 700);
                }

                setTimeout(() => {
                    setShowFounderSlots(true);
                }, 850);

                if (founderOfferActive) {
                    setTimeout(() => {
                        setShowSavingsCard(true);
                    }, 1050);
                }

                setTimeout(() => {
                    confetti({
                        particleCount: 180,
                        spread: 110,
                        origin: {
                            y: 0.55,
                        },
                    });
                }, 700);

                setTimeout(() => {

                    // If the founder offer has ended,
                    // don't animate the price reduction.
                    if (!founderOfferActive) {
                        setDisplayTotal(effectiveTotal);
                        return;
                    }

                    let current = originalTotal;

                    const countdown = setInterval(() => {

                        current--;

                        setDisplayTotal(current);

                        if (current <= effectiveTotal) {

                            clearInterval(countdown);

                            setDisplayTotal(effectiveTotal);

                            setTimeout(() => {
                                setShowLifetimeBadge(true);
                            }, 400);

                        }

                    }, 18);

                }, 450);
        }, 150);

        return () => clearTimeout(timer);
}, [
    ready,
    offerUnlocked,
    originalTotal,
    effectiveTotal,
    founderOfferActive,
]);

    useEffect(() => {

    const loadAvailability = async () => {

        const result =
            await occupantService.getHostelAvailability();

        if (result.success) {

            setRemainingFounderSlots(
                result.data.remainingFounderSlots
            );

            setTotalFounderSlots(
                result.data.totalFounderSlots
            );

        }

    };

    loadAvailability();

}, []);

return (
    <div className="mt-12 space-y-8">

        {/* Nothing is shown until BOTH cards are revealed */}

            <AnimatePresence mode="wait">

                {showPlaceholder && (

                    <motion.div
                        key="locked-placeholder"
                        initial={{
                            opacity: 0,
                            scale: 0.96,
                            y: 30,
                        }}
                        animate={{
                            opacity: 1,
                            scale: 1,
                            y: 0,
                        }}
                        exit={{
                            opacity: 0,
                            scale: 0.94,
                            y: -30,
                        }}
                        transition={{
                            duration: 0.6,
                            ease: "easeInOut",
                        }}
                    >

                        <LockedOfferPlaceholder />

                    </motion.div>

                    )}

            </AnimatePresence>

        {ready && (

            <>

                {founderOfferActive && (
                    <div
                        className={`
                            transition-all
                            duration-700
                            ${
                                showRibbon
                                    ? "opacity-100 translate-y-0"
                                    : "opacity-0 -translate-y-6"
                            }
                        `}
                    >
                        <OfferRibbon
                            visible={showRibbon}
                        />
                    </div>
                )}

                <div
                    className={`
                        transition-all
                        duration-700 ease-out
                        ${
                            showPaymentSummary
                                ? "translate-y-0 opacity-100"
                                : "translate-y-16 opacity-0"
                        }
                    `}
                >

                    <PaymentBreakdown
                        rent={rent}
                        cleaning={cleaning}
                        originalCleaning={cleaning}
                        displayTotal={displayTotal}
                        offerUnlocked={offerUnlocked}
                        showLifetimeBadge={
                            founderOfferActive && showLifetimeBadge
                        }
                    />

                </div>

                {founderOfferActive && (
                    <div
                        className={`
                            transition-all
                            delay-300
                            duration-700
                            ${
                                showLifetimeOffer
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-8 opacity-0"
                            }
                        `}
                    >
                        <LifetimeOfferCard
                            offerUnlocked={offerUnlocked}
                        />
                    </div>
                )}

                <div
                    className={`
                        transition-all
                        duration-700
                        ${
                            showFounderSlots
                                ? "translate-y-0 opacity-100"
                                : "translate-y-8 opacity-0"
                        }
                    `}
                >

                    <FounderSlotsCard
                        remainingSlots={remainingFounderSlots}
                        totalSlots={totalFounderSlots}
                    />

                </div>

                {founderOfferActive && (
                    <div
                        className={`
                            transition-all
                            delay-500
                            duration-700
                            ${
                                showSavingsCard
                                    ? "translate-y-0 opacity-100"
                                    : "translate-y-8 opacity-0"
                            }
                        `}
                    >
                        <SavingsCard
                            rent={rent}
                            cleaning={cleaning}
                            offerUnlocked={offerUnlocked}
                        />
                    </div>
                )}

            </>

        )}

    </div>
);
}