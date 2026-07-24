import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    BedDouble,
    DoorOpen,
    Users,
} from "lucide-react";
import occupantService from "../../services/occupantService";
import AvailabilityCard from "../ui/AvailabilityCard";
import { getAvailabilityStatus } from "../../utils/availabilityUtils";
import { AVAILABILITY_CONTENT } from "../../constants/availabilityContent";
import { HOSTEL_CONFIG } from "../../constants/hostelConfig";
import SkeletonCard from "../ui/SkeletonCard";

export default function AvailabilitySection() {

const [occupiedBeds, setOccupiedBeds] = useState(0);

const [loading, setLoading] = useState(true);

const availableBeds =
    HOSTEL_CONFIG.totalBeds - occupiedBeds;

const availablePercentage =
    (availableBeds / HOSTEL_CONFIG.totalBeds) * 100;

const occupiedPercentage =
    (occupiedBeds / HOSTEL_CONFIG.totalBeds) * 100;

const availabilityStatus =
    getAvailabilityStatus(availableBeds);

useEffect(() => {

    const loadOccupants = async () => {

        setLoading(true);

        const response = await occupantService.getOccupants();

        if (response.success) {

            const activeOccupants = response.data.filter(
                (occupant) => occupant.status === "Active"
            );

            setOccupiedBeds(activeOccupants.length);
        }

        setLoading(false);
    };

    loadOccupants();

}, []);

  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 my-12 md:my-16">
      <motion.div

    initial={{
        opacity: 0,
        y: 60,
    }}

    whileInView={{
        opacity: 1,
        y: 0,
    }}

    transition={{
        duration: 0.8,
    }}

    viewport={{
        once: true,
    }}
        className="
            bg-white
            rounded-3xl
            p-6
            sm:p-8
            lg:p-10
            shadow-xl
            text-center
            transition-all
            duration-300
            "
      >
                    <div
                className="
                inline-flex
                items-center
                gap-2
                bg-green-100
                text-green-700
                px-4
                py-2
                rounded-full
                font-semibold
                mb-6
                text-sm
                sm:text-base
                "
            >
                {AVAILABILITY_CONTENT.badge}
            </div>

            <h2
                className="
                text-3xl
                sm:text-4xl
                lg:text-5xl
                font-bold
                text-slate-800
                mb-4
                "
            >
                {AVAILABILITY_CONTENT.title}
            </h2>

        <p
          className="
            text-slate-500
            text-base
            sm:text-lg
            max-w-3xl
            mx-auto
            mb-8
            leading-relaxed
            "
        >
         {AVAILABILITY_CONTENT.description}
        </p>

        <div
    style={{
        marginBottom: "35px",
    }}
>

<span
    style={{
        background:
            availableBeds >= 5
                ? "#dcfce7"
                : availableBeds >= 2
                ? "#fef3c7"
                : "#fee2e2",

        color:
            availableBeds >= 5
                ? "#166534"
                : availableBeds >= 2
                ? "#92400e"
                : "#991b1b",

        padding: "10px 22px",

        borderRadius: "999px",

        fontWeight: "700",

        fontSize: "16px",
    }}
>

{availabilityStatus.label}

</span>

</div>

{loading ? (

    <div
        className="
            grid
            grid-cols-1
            md:grid-cols-3
            gap-6
            mt-10
        "
    >

        <SkeletonCard />

        <SkeletonCard />

        <SkeletonCard />

    </div>

) : (

        <div
    style={{
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(220px,1fr))",
        gap: "25px",
        marginTop: "40px",
    }}
>

    {/* Available */}

<AvailabilityCard
    title={AVAILABILITY_CONTENT.cards.available.title}
    value={availableBeds}
    subtitle={AVAILABILITY_CONTENT.cards.available.subtitle}
    icon={DoorOpen}
    color="green"
    delay={0}
/>

    {/* Capacity */}

<AvailabilityCard
    title="Total Capacity"
    value={HOSTEL_CONFIG.totalBeds}
    subtitle="Total Hostel Beds"
    icon={BedDouble}
    color="blue"
    delay={0.15}
/>

    {/* Occupied */}

<AvailabilityCard
    title="Occupied"
    value={occupiedBeds}
    subtitle="Beds Occupied"
    icon={Users}
    color="red"
    delay={0.30}
/>
</div>

)}
            <div
    className="mt-11"
>

    <div
    style={{
        display: "flex",
        height: "24px",
        borderRadius: "999px",
        overflow: "hidden",
        background: "#e2e8f0",
        boxShadow: "inset 0 3px 8px rgba(0,0,0,0.08)",
    }}
>

        <div
    style={{
        width: `${availablePercentage}%`,
        background:
            "linear-gradient(90deg,#22c55e,#16a34a)",
        transition: "width 1s ease-in-out",
    }}
/>

        <div
    style={{
        width: `${occupiedPercentage}%`,
        background:
            "linear-gradient(90deg,#ef4444,#dc2626)",
        transition: "width 1s ease-in-out",
    }}
/>

    </div>

</div>
            <div
                className="
                flex
                justify-between
                mt-3
                font-semibold
                "
            >

    <span
        style={{
            color: "#16a34a",
        }}
    >
        {Math.round(availablePercentage)}% Available
    </span>

    <span
        style={{
            color: "#dc2626",
        }}
    >
        {Math.round(occupiedPercentage)}% Occupied
    </span>

</div>

<div
        className="
    flex
    flex-wrap
    justify-center
    gap-6
    mt-10
    "
>

    <span>

        🟢 Live Occupancy

    </span>

    <span>

        🔄 Automatically Updated

    </span>

    <span>

        🛏️ Real-Time Availability

    </span>

</div>

<p
    style={{
        marginTop: "25px",
        color: "#94a3b8",
        fontSize: "14px",
    }}
>
    Last updated: {new Date().toLocaleTimeString()}
</p>

</motion.div>

</section>
  );
}