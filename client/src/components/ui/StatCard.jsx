export default function StatCard({
    title,
    value,
    bg,
}) {

    return (

        <div
            style={{
                background: bg,
                borderRadius: "14px",
                padding: "20px",
                boxShadow:
                    "0 4px 12px rgba(0,0,0,0.08)",
                minHeight: "90px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
            }}
        >

            <div
                style={{
                    fontSize: "15px",
                    color: "#475569",
                    marginBottom: "8px",
                    fontWeight: "600",
                }}
            >
                {title}
            </div>

            <div
                style={{
                    fontSize: "30px",
                    fontWeight: "700",
                    color: "#0f172a",
                }}
            >
                {value}
            </div>

        </div>

    );

}