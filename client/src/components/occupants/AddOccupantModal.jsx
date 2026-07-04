import OccupantForm from "./OccupantForm";

export default function AddOccupantModal({
    isOpen,
    onClose,
    onSave,
    occupant,
}) {
    if (!isOpen) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 999,
            }}
        >
            <div
                style={{
                    background: "#fff",
                    width: "450px",
                    padding: "30px",
                    borderRadius: "14px",
                    boxShadow: "0 15px 35px rgba(0,0,0,0.25)",
                }}
            >
                <h2
                    style={{
                        marginTop: 0,
                        marginBottom: "25px",
                    }}
                >
                    {occupant ? "Edit Occupant" : "Add New Occupant"}
                </h2>

               <OccupantForm
                    occupant={occupant}
                    onSave={onSave}
                    onCancel={onClose}
                />
            </div>
        </div>
    );
}