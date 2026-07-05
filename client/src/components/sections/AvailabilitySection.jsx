import { useEffect, useState } from "react";
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
            marginBottom: "30px",
            fontSize: "18px",
          }}
        >
          We maintain limited occupancy to provide a peaceful and comfortable
          study environment.
        </p>

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

    <div
        style={{
            background: "#f0fdf4",
            padding: "38px",
            borderRadius: "18px",
            textAlign: "center",
        }}
    >
        <DoorOpen
            size={42}
            color="#16a34a"
        />

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
            Ready to Move In
        </p>
    </div>

    {/* Capacity */}

    <div
        style={{
            background: "#eff6ff",
            padding: "38px",
            borderRadius: "18px",
            textAlign: "center",
        }}
    >
        <BedDouble
            size={42}
            color="#2563eb"
        />

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
    </div>

    {/* Occupied */}

    <div
        style={{
            background: "#fef2f2",
            padding: "38px",
            borderRadius: "18px",
            textAlign: "center",
        }}
    >
        <Users
            size={42}
            color="#dc2626"
        />

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
            Currently Occupied
        </p>
    </div>

</div>
            <div
    style={{
        marginTop: "45px",
    }}
>

    <div
        style={{
            display: "flex",
            height: "18px",
            borderRadius: "999px",
            overflow: "hidden",
            background: "#e5e7eb",
        }}
    >

        <div
            style={{
                width: `${availablePercentage}%`,
                background: "#16a34a",
                transition: "0.8s",
            }}
        />

        <div
            style={{
                width: `${occupiedPercentage}%`,
                background: "#dc2626",
                transition: "0.8s",
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
      </div>
    </section>
  );
}