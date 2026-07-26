export default function RequestStatusBadge({ status }) {

    const backgroundColorMap = {
        Pending: "#f59e0b",
        Approved: "#16a34a",
        Rejected: "#dc2626",
        Expired: "#ea580c",
    };

    const backgroundColor =
        backgroundColorMap[status] || "#f59e0b";

    return (
        <span
            style={{
                padding: "6px 14px",
                borderRadius: "999px",
                backgroundColor,
                color: "white",
                fontWeight: "600",
                fontSize: "14px",
            }}
        >
            {status}
        </span>
    );
}