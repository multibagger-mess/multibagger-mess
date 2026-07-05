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

    const [editingOccupant, setEditingOccupant] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");

    const [statusFilter, setStatusFilter] = useState("All");

    const totalOccupants = occupants.length;

const activeOccupants = occupants.filter(
    (occupant) => occupant.status === "Active"
).length;

const leftOccupants = occupants.filter(
    (occupant) => occupant.status === "Left"
).length;

const pendingPayments = occupants.filter(
    (occupant) => occupant.paymentStatus === "Pending"
).length;

const filteredOccupants = occupants.filter((occupant) => {

    const search = searchTerm.toLowerCase();

    const matchesSearch =

        occupant.name.toLowerCase().includes(search) ||

        occupant.phoneNumber.includes(search);

    const matchesStatus =

        statusFilter === "All" ||

        occupant.status === statusFilter;

    return matchesSearch && matchesStatus;

});

    const loadOccupants = async () => {

    const response = await occupantService.getOccupants();

    if (response.success) {
        setOccupants(response.data);
    }
};

    const handleMarkLeft = async (occupantId) => {

    const confirmed = window.confirm(
        "Are you sure you want to mark this occupant as Left?"
    );

    if (!confirmed) return;

    const response = await occupantService.markOccupantLeft(
        occupantId
    );

    if (response.success) {

        await loadOccupants();

    } else {

        alert(response.message);

    }

};

        const handleRestoreOccupant = async (occupantId) => {

    const confirmed = window.confirm(
        "Are you sure you want to restore this occupant?"
    );

    if (!confirmed) return;

    const response =
        await occupantService.restoreOccupant(
            occupantId
        );

    if (response.success) {

        await loadOccupants();

    } else {

        alert(response.message);

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

            <div
    style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
    }}
>

    <div
    onClick={() => setStatusFilter("All")}
    style={{
        background: "#ffffff",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        cursor: "pointer",
        transition: "0.2s",
    }}
>
        <h4>Total Occupants</h4>
        <h2>{totalOccupants}</h2>
    </div>

    <div
    onClick={() => setStatusFilter("Active")}
    style={{
        background: "#ecfdf5",
        padding: "20px",
        borderRadius: "12px",
        cursor: "pointer",
    }}
>
        <h4>Active</h4>
        <h2>{activeOccupants}</h2>
    </div>

   <div
    onClick={() => setStatusFilter("Left")}
    style={{
        background: "#fef2f2",
        padding: "20px",
        borderRadius: "12px",
        cursor: "pointer",
    }}
>
        <h4>Left</h4>
        <h2>{leftOccupants}</h2>
    </div>

    <div
        style={{
            background: "#fff7ed",
            padding: "20px",
            borderRadius: "12px",
        }}
    >
        <h4>Pending Payments</h4>
        <h2>{pendingPayments}</h2>
    </div>

</div>

            <button
                onClick={() => {
    setEditingOccupant(null);
    setShowModal(true);
}}
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
        marginBottom: "25px",
    }}
>
    <input
        type="text"
        placeholder="🔍 Search by Name or Phone Number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
            width: "100%",
            padding: "14px",
            border: "1px solid #d1d5db",
            borderRadius: "10px",
            fontSize: "16px",
            outline: "none",
        }}
    />
</div>

        <div
    style={{
        display: "flex",
        gap: "12px",
        marginBottom: "25px",
    }}
>

    <button
        onClick={() => setStatusFilter("All")}
        style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background:
                statusFilter === "All"
                    ? "#2563eb"
                    : "#e5e7eb",
            color:
                statusFilter === "All"
                    ? "white"
                    : "black",
        }}
    >
        All
    </button>

    <button
        onClick={() => setStatusFilter("Active")}
        style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background:
                statusFilter === "Active"
                    ? "#16a34a"
                    : "#e5e7eb",
            color:
                statusFilter === "Active"
                    ? "white"
                    : "black",
        }}
    >
        Active
    </button>

    <button
        onClick={() => setStatusFilter("Left")}
        style={{
            padding: "10px 18px",
            borderRadius: "8px",
            border: "none",
            cursor: "pointer",
            background:
                statusFilter === "Left"
                    ? "#dc2626"
                    : "#e5e7eb",
            color:
                statusFilter === "Left"
                    ? "white"
                    : "black",
        }}
    >
        Left
    </button>

</div>

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

  filteredOccupants.map((occupant) => (

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

    <div
    style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
    }}
>
    <BadgeCheck
        size={18}
        color={occupant.status === "Active" ? "green" : "red"}
    />

    <span
        style={{
            background:
                occupant.status === "Active"
                    ? "#dcfce7"
                    : "#fee2e2",
            color:
                occupant.status === "Active"
                    ? "#166534"
                    : "#991b1b",
            padding: "4px 12px",
            borderRadius: "999px",
            fontWeight: "600",
        }}
    >
        {occupant.status}
    </span>
</div>

   <div
    style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
    }}
>
    <CreditCard size={18} color="#64748b" />

    <span
        style={{
            background:
                occupant.paymentStatus === "Paid"
                    ? "#dcfce7"
                    : "#fef3c7",
            color:
                occupant.paymentStatus === "Paid"
                    ? "#166534"
                    : "#92400e",
            padding: "4px 12px",
            borderRadius: "999px",
            fontWeight: "600",
        }}
    >
        {occupant.paymentStatus}
    </span>
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
    onClick={() => {
        setEditingOccupant(occupant);
        setShowModal(true);
    }}
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
    onClick={() => {

        if (occupant.status === "Active") {

            handleMarkLeft(occupant._id);

        } else {

            handleRestoreOccupant(
                occupant._id
            );

        }

    }}
    style={{
        background:
            occupant.status === "Active"
                ? "#dc2626"
                : "#16a34a",
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

    {
        occupant.status === "Active"
            ? "Mark Left"
            : "Restore Occupant"
    }

</button>
</div>
        </div>

    ))

)}
            </div>

           <AddOccupantModal
                isOpen={showModal}
                occupant={editingOccupant}
                onClose={() => setShowModal(false)}
                onSave={async (data) => {

                    console.log("editingOccupant =", editingOccupant);

                    if (editingOccupant) {

    const response = await occupantService.updateOccupant(
        editingOccupant._id,
        data
    );

    if (response.success) {

        await loadOccupants();

        setEditingOccupant(null);

        setShowModal(false);

    } else {

        alert(response.message);

    }

} else {

    const response = await occupantService.createOccupant(data);

    if (response.success) {

        await loadOccupants();

        setShowModal(false);

    } else {

        alert(response.message);

    }

}
                }}
            />
        </div>
    );
}