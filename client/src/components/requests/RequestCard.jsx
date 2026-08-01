import RequestStatusBadge from "./RequestStatusBadge";
import RequestActionButtons from "./RequestActionButtons";
import {
    User,
    Phone,
    CalendarDays,
    CheckCircle2,
    Clock3,
} from "lucide-react";
import { motion } from "framer-motion";

const formatDateTime = (date) => {

    if (!date) return "";

    return {

        date: new Date(date).toLocaleDateString(
            "en-GB",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        ),

        time: new Date(date).toLocaleTimeString(
            "en-GB",
            {
                hour: "2-digit",
                minute: "2-digit",
            }
        ),

    };

};
export default function RequestCard({
    request,
    loadingAction,
    onApprove,
    onReject,
    onDelete,
    onWhatsApp,
}) {

    const submitted = formatDateTime(request.createdAt);

    const approved = formatDateTime(request.approvedAt);

    const expires = formatDateTime(request.accessExpiresAt);

return (

    <motion.div

        initial={{
            opacity: 0,
            y: 12,
        }}

        animate={{
            opacity: 1,
            y: 0,
        }}

        transition={{
            duration: 0.35,
        }}

        whileHover={{
            y: -4,
            scale: 1.01,
        }}

        style={{
                backgroundColor: "#ffffff",
                borderRadius: "14px",
                boxShadow:
                    "0 6px 16px rgba(0,0,0,0.08)",
                padding: "24px",
                marginBottom: "24px",
            }}
        >

            <div
    style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "12px",
    }}
>

    <div
    style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
    }}
>

    <User size={24} />

    <span>{request.name}</span>

</div>

    <RequestStatusBadge
        status={request.status}
    />

</div>

            <div
    style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        color: "#475569",
        marginBottom: "10px",
        fontSize: "16px",
    }}
>

    <Phone size={18} />

    {request.phoneNumber}

</div>

            <hr
                style={{
                    margin: "18px 0",
                    border: "none",
                    borderTop:
                        "1px solid #e2e8f0",
                }}
            />

           <div
    style={{
        display: "grid",
        gridTemplateColumns: "170px 1fr",
        rowGap: "14px",
        columnGap: "20px",
        marginBottom: "22px",
        fontSize: "15px",
    }}
>

<div
    style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        fontWeight: "600",
        paddingTop: "2px",
    }}
>
    <CalendarDays
        size={16}
        style={{
            marginTop: "2px",
        }}
    />

    <span>Submitted</span>
</div>

    <div>

    <div
        style={{
            fontWeight: "600",
            color: "#1e293b",
        }}
    >
        {submitted.date}
    </div>

    <div
        style={{
            fontSize: "13px",
            color: "#64748b",
        }}
    >
        {submitted.time}
    </div>

</div>

    {request.status === "Approved" &&
        request.approvedAt && (
        <>
<div
    style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        fontWeight: "600",
        color: "#166534",
        paddingTop: "2px",
    }}
>
    <CheckCircle2
        size={16}
        style={{
            marginTop: "2px",
        }}
    />

    <span>Approved</span>
</div>

            <div>

    <div
        style={{
            fontWeight: "600",
            color: "#166534",
        }}
    >
        {approved.date}
    </div>

    <div
        style={{
            fontSize: "13px",
            color: "#64748b",
        }}
    >
        {approved.time}
    </div>

</div>
        </>
    )}

    {request.status === "Rejected" &&
        request.rejectedAt && (
        <>
            <strong>❌ Rejected</strong>

            <span>
                {new Date(request.rejectedAt).toLocaleDateString()}
                {" • "}
                {new Date(request.rejectedAt).toLocaleTimeString()}
            </span>
        </>
    )}

    {request.accessExpiresAt && (
        <>
<div
    style={{
        display: "flex",
        alignItems: "flex-start",
        gap: "8px",
        fontWeight: "600",
        color: "#92400e",
        paddingTop: "2px",
    }}
>
    <Clock3 size={16} />

    <span>Expires</span>
</div>

            <div>

    <div
        style={{
            fontWeight: "600",
            color: "#92400e",
        }}
    >
        {expires.date}
    </div>

    <div
        style={{
            fontSize: "13px",
            color: "#64748b",
        }}
    >
        {expires.time}
    </div>

    {request.status === "Approved" &&
        request.daysRemaining !== null && (

        <div
            style={{
                display: "inline-flex",
                alignItems: "center",
                marginTop: "8px",
                padding: "4px 10px",
                backgroundColor: "#dbeafe",
                color: "#1d4ed8",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: "600",
            }}
        >
            {request.daysRemaining} Days Left
        </div>
    )}

</div>
        </>
    )}

</div>

            <RequestActionButtons
                request={request}
                loadingAction={loadingAction}
                onApprove={onApprove}
                onReject={onReject}
                onDelete={onDelete}
                onWhatsApp={onWhatsApp}
            />

        </motion.div>

    );

}