export default function ConfirmationModal({
    open,
    title,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    confirmColor = "#dc2626",
    onConfirm,
    onCancel,
}) {

    if (!open) return null;

    return (

        <div
            style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.45)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 9999,
            }}
        >

            <div
                style={{
                    background: "#fff",
                    borderRadius: "14px",
                    width: "420px",
                    maxWidth: "90%",
                    padding: "24px",
                    boxShadow:
                        "0 20px 40px rgba(0,0,0,0.2)",
                }}
            >

                <h2
                    style={{
                        marginTop: 0,
                        color: "#1e293b",
                    }}
                >
                    {title}
                </h2>

                <p
                    style={{
                        color: "#64748b",
                        lineHeight: 1.6,
                        marginBottom: "24px",
                    }}
                >
                    {message}
                </p>

                <div
                    style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        gap: "12px",
                    }}
                >

                    <button
                        onClick={onCancel}
                        style={{
                            padding: "10px 18px",
                            borderRadius: "8px",
                            border: "1px solid #cbd5e1",
                            background: "#fff",
                            cursor: "pointer",
                        }}
                    >
                        {cancelText}
                    </button>

                    <button
                        onClick={onConfirm}
                        style={{
                            padding: "10px 18px",
                            borderRadius: "8px",
                            border: "none",
                            background: confirmColor,
                            color: "#fff",
                            cursor: "pointer",
                            fontWeight: "600",
                        }}
                    >
                        {confirmText}
                    </button>

                </div>

            </div>

        </div>

    );

}