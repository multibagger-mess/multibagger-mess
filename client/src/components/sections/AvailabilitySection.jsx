import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
    BedDouble,
    DoorOpen,
    Users,
} from "lucide-react";
import occupantService from "../../services/occupantService";

export default function AvailabilitySection() {

const TOTAL_BEDS = 10;

const [occupiedBeds, setOccupiedBeds] = useState(0);

const availableBeds = TOTAL_BEDS - occupiedBeds;

const availablePercentage =
    (availableBeds / TOTAL_BEDS) * 100;

const occupiedPercentage =
    (occupiedBeds / TOTAL_BEDS) * 100;

useEffect(() => {

    const loadOccupants = async () => {

        const response = await occupantService.getOccupants();

        if (response.success) {

            const activeOccupants = response.data.filter(
                (occupant) => occupant.status === "Active"
            );

            setOccupiedBeds(activeOccupants.length);
        }
    };

    loadOccupants();

}, []);

  return (
    <section
      style={{
        maxWidth: "1100px",
        margin: "60px auto",
        padding: "0 20px",
      }}
    >
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
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 20px 45px rgba(0,0,0,0.10)",
          transition: "0.35s",
          textAlign: "center",
        }}
      >
                    <div
                style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "#dcfce7",
                    color: "#166534",
                    padding: "10px 20px",
                    borderRadius: "999px",
                    fontWeight: "700",
                    marginBottom: "25px",
                }}
            >
                🟢 LIVE AVAILABILITY
            </div>

            <h2
                style={{
                    fontSize: "38px",
                    color: "#1e293b",
                    marginBottom: "15px",
                    fontWeight: "700",
                }}
            >
                Live Hostel Availability
            </h2>

        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
            fontSize: "18px",
          }}
        >
         Real-time occupancy of The Multi-Bagger Mess.
         Availability updates automatically whenever a resident joins or leaves.
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

{
    availableBeds >= 5
        ? "🟢 Good Availability"

        : availableBeds >= 2

        ? "🟠 Limited Beds"

        : "🔴 Hostel Full"
}

</span>

</div>

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

    <motion.div

    initial={{
        opacity:0,
        y:40,
    }}

    whileInView={{
        opacity:1,
        y:0,
    }}

    transition={{
        duration:0.5,
        delay:0,
    }}

    viewport={{
        once:true,
    }}

    style={{
        background: "#f0fdf4",
        padding: "38px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(22,163,74,0.08)",
        transition: "all 0.35s ease",
        cursor: "default",
    }}

    onMouseEnter={(e)=>{
        e.currentTarget.style.transform="translateY(-8px)";
        e.currentTarget.style.boxShadow="0 20px 35px rgba(22,163,74,0.18)";
    }}

    onMouseLeave={(e)=>{
        e.currentTarget.style.transform="translateY(0px)";
        e.currentTarget.style.boxShadow="0 10px 25px rgba(22,163,74,0.08)";
    }}
>
        <div
    style={{
        width: "70px",
        height: "70px",
        margin: "0 auto",
        borderRadius: "50%",
        background: "#dcfce7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}
>

    <DoorOpen
        size={34}
        color="#16a34a"
    />

</div>

        <h3
            style={{
                marginTop: "15px",
                marginBottom: "10px",
            }}
        >
            Available
        </h3>

        <h1
            style={{
                color: "#16a34a",
                fontSize: "62px",
                margin: 0,
            }}
        >
            {availableBeds}
        </h1>

        <p
            style={{
                color: "#64748b",
            }}
        >
            Beds Available Right Now
        </p>
    </motion.div>

    {/* Capacity */}

    {/* Capacity */}

<motion.div

    initial={{
        opacity: 0,
        y: 40,
    }}

    whileInView={{
        opacity: 1,
        y: 0,
    }}

    transition={{
        duration: 0.5,
        delay: 0.15,
    }}

    viewport={{
        once: true,
    }}

    style={{
        background: "#eff6ff",
        padding: "38px",
        borderRadius: "20px",
        textAlign: "center",
        boxShadow: "0 10px 25px rgba(37,99,235,0.08)",
        transition: "all 0.35s ease",
        cursor: "default",
    }}

    onMouseEnter={(e)=>{
        e.currentTarget.style.transform="translateY(-8px)";
        e.currentTarget.style.boxShadow="0 20px 35px rgba(37,99,235,0.18)";
    }}

    onMouseLeave={(e)=>{
        e.currentTarget.style.transform="translateY(0px)";
        e.currentTarget.style.boxShadow="0 10px 25px rgba(37,99,235,0.08)";
    }}
>
        <div
    style={{
        width: "70px",
        height: "70px",
        margin: "0 auto",
        borderRadius: "50%",
        background: "#dbeafe",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}
>

    <BedDouble
        size={34}
        color="#2563eb"
    />

</div>

        <h3
            style={{
                marginTop: "15px",
                marginBottom: "10px",
            }}
        >
            Total Capacity
        </h3>

        <h1
            style={{
                color: "#2563eb",
                fontSize: "62px",
                margin: 0,
            }}
        >
            {TOTAL_BEDS}
        </h1>

        <p
            style={{
                color: "#64748b",
            }}
        >
            Total Hostel Beds
        </p>
    </motion.div>

    {/* Occupied */}

    {/* Occupied */}

<motion.div

    initial={{
        opacity: 0,
        y: 40,
    }}

    whileInView={{
        opacity: 1,
        y: 0,
    }}

    transition={{
        duration: 0.5,
        delay: 0.30,
    }}

    viewport={{
        once: true,
    }}

    style={{
        background:"#fef2f2",
        padding:"38px",
        borderRadius:"20px",
        textAlign:"center",
        boxShadow:"0 10px 25px rgba(220,38,38,0.08)",
        transition:"all 0.35s ease",
        cursor:"default",
    }}

    onMouseEnter={(e)=>{
        e.currentTarget.style.transform="translateY(-8px)";
        e.currentTarget.style.boxShadow="0 20px 35px rgba(220,38,38,0.18)";
    }}

    onMouseLeave={(e)=>{
        e.currentTarget.style.transform="translateY(0px)";
        e.currentTarget.style.boxShadow="0 10px 25px rgba(220,38,38,0.08)";
    }}
>
        <div
    style={{
        width: "70px",
        height: "70px",
        margin: "0 auto",
        borderRadius: "50%",
        background: "#fee2e2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    }}
>

    <Users
        size={34}
        color="#dc2626"
    />

</div>

        <h3
            style={{
                marginTop: "15px",
                marginBottom: "10px",
            }}
        >
            Occupied
        </h3>

        <h1
            style={{
                color: "#dc2626",
                fontSize: "62px",
                margin: 0,
            }}
        >
            {occupiedBeds}
        </h1>

        <p
            style={{
                color: "#64748b",
            }}
        >
            Beds Occupied
        </p>
    </motion.div>

</div>
            <div
    style={{
        marginTop: "45px",
    }}
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
    style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "12px",
        fontWeight: "600",
    }}
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
    style={{
        marginTop: "40px",
        display: "flex",
        justifyContent: "center",
        flexWrap: "wrap",
        gap: "25px",
        color: "#64748b",
        fontWeight: "600",
        fontSize: "15px",
    }}
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