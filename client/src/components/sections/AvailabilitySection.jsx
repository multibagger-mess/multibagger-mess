import { useEffect, useState } from "react";
import occupantService from "../../services/occupantService";

export default function AvailabilitySection() {

const TOTAL_BEDS = 10;

const [occupiedBeds, setOccupiedBeds] = useState(0);

const availableBeds = TOTAL_BEDS - occupiedBeds;

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
      <div
        style={{
          background: "#ffffff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
          textAlign: "center",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            color: "#1e293b",
            marginBottom: "15px",
          }}
        >
          🛏️ Current Bed Availability
        </h2>

          <p
    style={{
        color: "#64748b",
        marginBottom: "25px",
        fontSize: "16px",
    }}
>
    We maintain limited occupancy to provide a peaceful and comfortable study environment.
</p>
        <p
          style={{
            color: "#64748b",
            marginBottom: "30px",
            fontSize: "18px",
          }}
        >
          We maintain limited occupancy to provide a peaceful and comfortable
          study environment.
        </p>

        <div
          style={{
            fontSize: "48px",
            fontWeight: "bold",
            color: availableBeds > 0 ? "#16a34a" : "#dc2626",
          }}
        >
          <span
    style={{
        color: availableBeds > 0 ? "#16a34a" : "#dc2626",
    }}
>
    {availableBeds}
</span>

{" / "}

{TOTAL_BEDS}
        </div>
        <div
    style={{
        width: "100%",
        height: "12px",
        background: "#e5e7eb",
        borderRadius: "999px",
        marginTop: "25px",
        overflow: "hidden",
    }}
>
    <div
        style={{
            width: `${(occupiedBeds / TOTAL_BEDS) * 100}%`,
            height: "100%",
            background: "#2563eb",
            transition: "0.5s",
        }}
    />
</div>

         <p
            style={{
                marginTop: "15px",
                color: "#64748b",
                fontSize: "15px",
            }}
        >
    Occupancy : {Math.round((occupiedBeds / TOTAL_BEDS) * 100)}%
</p>
        <p
          style={{
            fontSize: "20px",
            marginTop: "15px",
            color: "#334155",
          }}
        >
           
          {availableBeds > 0
            ? "Beds Currently Available"
            : "Currently Full"}
        </p>
      </div>
    </section>
  );
}