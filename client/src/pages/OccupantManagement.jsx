import AddOccupantModal from "../components/occupants/AddOccupantModal";
import { useEffect, useState } from "react";
import {
    User,
    Phone,
    CalendarDays,
    BadgeCheck,
    CreditCard,
    Pencil,
    UserMinus,
} from "lucide-react";

import occupantService from "../services/occupantService";
export default function OccupantManagement() {
    
    const [occupants, setOccupants] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const loadOccupants = async () => {
    const response = await occupantService.getOccupants();

    if (response.success) {
        setOccupants(response.data);
    }
};
    
   useEffect(() => {
    async function fetchData() {
        await loadOccupants();
    }

    fetchData();
}, []);

    return (
        <div
            style={{
                maxWidth: "1000px",
                margin: "40px auto",
                padding: "20px",
            }}
        >
            <h1
                style={{
                    fontSize: "34px",
                    color: "#1e293b",
                    marginBottom: "25px",
                }}
            >
                Occupant Management
            </h1>

            <button
                onClick={() => setShowModal(true)}
                style={{
                    background: "#2563eb",
                    color: "#fff",
                    padding: "12px 22px",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    marginBottom: "30px",
                }}
            >
                + Add Occupant
            </button>

            <div
                style={{
                    background: "#fff",
                    padding: "30px",
                    borderRadius: "12px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                }}
            >
                {occupants.length === 0 ? (

    <h3>No Occupants Found</h3>

) : (

    occupants.map((occupant) => (

        <div
            key={occupant._id}
            style={{
                padding: "20px",
                borderBottom: "1px solid #e2e8f0",
            }}
        >

            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
    <User size={24} color="#2563eb" />
    <h2 style={{ margin: 0 }}>{occupant.name}</h2>
</div>

<div
    style={{
        marginTop: "15px",
        display: "grid",
        gap: "12px",
    }}
>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Phone size={18} color="#64748b" />
        <span>{occupant.phoneNumber}</span>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <CalendarDays size={18} color="#64748b" />
        <span>
            Joined :
            {" "}
            {new Date(occupant.joinedDate).toLocaleDateString()}
        </span>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <BadgeCheck
            size={18}
            color={occupant.status === "Active" ? "green" : "red"}
        />
        <span>Status : {occupant.status}</span>
    </div>

    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <CreditCard size={18} color="#64748b" />
        <span>Payment : {occupant.paymentStatus}</span>
    </div>
</div>

<div
    style={{
        marginTop: "20px",
        display: "flex",
        gap: "15px",
    }}
>
    <button
        style={{
            background: "#2563eb",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
        }}
    >
        <Pencil size={16} />
        Edit
    </button>

    <button
        style={{
            background: "#dc2626",
            color: "white",
            border: "none",
            padding: "10px 18px",
            borderRadius: "8px",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: "8px",
        }}
    >
        <UserMinus size={16} />
        Mark Left
    </button>
</div>
        </div>

    ))

)}
            </div>

           <AddOccupantModal
    isOpen={showModal}
    onClose={() => setShowModal(false)}
    onSave={async (data) => {

    console.log("Received in OccupantManagement:", data);

    const response = await occupantService.createOccupant(data);

    console.log("POST Response:", response);

    if (response.success) {

        await loadOccupants();

        setShowModal(false);

    } else {

        alert(response.message);

    }

}}
/>
        </div>
    );
}