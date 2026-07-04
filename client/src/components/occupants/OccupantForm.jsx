import { useState, } from "react";

export default function OccupantForm({
    occupant,
    onSave,
    onCancel,
}) {
    const [formData, setFormData] = useState({
    name: occupant?.name || "",
    phoneNumber: occupant?.phoneNumber || "",
    status: occupant?.status || "Active",
});

   const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === "name") {
        value = value.replace(/[^A-Za-z ]/g, "");
    }

    if (name === "phoneNumber") {
        value = value.replace(/\D/g, "");
        value = value.slice(0, 10);
    }

    setFormData({
        ...formData,
        [name]: value,
    });
};

    const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting Form:", formData);

    await onSave(formData);
};

    return (
        <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: "20px" }}>
                <label>Name</label>

                <input
                    type="text"
                    name="name"
                    maxLength={50}
                    value={formData.name}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>

            <div style={{ marginBottom: "20px" }}>
                <label>Phone Number</label>

                <input
                    type="text"
                    name="phoneNumber"
                    inputMode="numeric"
                    maxLength={10}
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        borderRadius: "8px",
                        border: "1px solid #ccc",
                    }}
                />
            </div>

            <div style={{ marginBottom: "25px" }}>
                <label>Status</label>

                <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    style={{
                        width: "100%",
                        padding: "12px",
                        marginTop: "8px",
                        borderRadius: "8px",
                    }}
                >
                    <option>Active</option>
                    <option>Left</option>
                </select>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    gap: "12px",
                }}
            >
                <button
                    type="button"
                    onClick={onCancel}
                    style={{
                        padding: "10px 18px",
                        cursor: "pointer",
                    }}
                >
                    Cancel
                </button>

                <button
                    type="submit"
                    disabled={
                        formData.name.trim().length < 3 ||
                        formData.phoneNumber.length !== 10
                    }
                    style={{
    padding: "10px 18px",
    background:
        formData.name.trim().length >= 3 &&
        formData.phoneNumber.length === 10
            ? "#2563eb"
            : "#94a3b8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor:
        formData.name.trim().length >= 3 &&
        formData.phoneNumber.length === 10
            ? "pointer"
            : "not-allowed",
}}
                >
                    {occupant ? "Update Occupant" : "Save Occupant"}
                </button>
            </div>

        </form>
    );
}