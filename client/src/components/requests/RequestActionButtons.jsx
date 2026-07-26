import { Trash2 } from "lucide-react";

export default function RequestActionButtons({
    request,
    loadingAction,
    onApprove,
    onReject,
    onDelete,
}) {

    const isApproving =
    loadingAction === `Approved-${request._id}`;

    const isRejecting =
        loadingAction === `Rejected-${request._id}`;

    const isDeleting =
        loadingAction === `Delete-${request._id}`;

    return (

        <div
            style={{
                marginTop: "20px",
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
            }}
        >

            <button
                onClick={() => onApprove(request._id)}
                disabled={
                    request.status === "Approved" ||
                    isApproving
                }
                style={{
                    backgroundColor: "#16a34a",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "6px",
                    cursor:
                        request.status === "Approved" ||
                        isApproving
                            ? "not-allowed"
                            : "pointer",
                    opacity:
                        request.status === "Approved" ||
                        isApproving
                            ? 0.6
                            : 1,
                }}
                >
                    {isApproving
                        ? "Approving..."
                        : request.status === "Approved"
                        ? "✓ Approved"
                        : "Approve"}
                </button>

            <button
                onClick={() => onReject(request._id)}
                disabled={
                    request.status === "Rejected" ||
                    isRejecting
                }
                style={{
                    backgroundColor: "#dc2626",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "6px",
                    cursor:
                        request.status === "Rejected" ||
                        isRejecting
                            ? "not-allowed"
                            : "pointer",
                    opacity:
                        request.status === "Rejected" ||
                        isRejecting
                            ? 0.6
                            : 1,
                }}
                    >
                        {isRejecting
                            ? "Rejecting..."
                            : request.status === "Rejected"
                            ? "✗ Rejected"
                            : "Reject"}
                    </button>

            <button
                onClick={() => onDelete(request._id)}
                disabled={isDeleting}
                style={{
                    backgroundColor: "#991b1b",
                    color: "white",
                    border: "none",
                    padding: "10px 18px",
                    borderRadius: "6px",
                    cursor: isDeleting
                        ? "not-allowed"
                        : "pointer",

                    opacity: isDeleting
                        ? 0.6
                        : 1,
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                }}
            >
                <Trash2 size={16} />

                {isDeleting
                    ? "Deleting..."
                    : "Delete"}
            </button>

        </div>

    );

}