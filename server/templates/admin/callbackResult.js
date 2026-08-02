const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "medium",
        timeStyle: "short",
    });

module.exports = ({
    request,
    status,
}) => {

    const approved =
        status === "Approved";

    return `
🏠 <b>The Multi-Bagger Mess</b>

━━━━━━━━━━━━━━━━━━

${approved
? "✅ <b>REQUEST APPROVED</b>"
: "❌ <b>REQUEST REJECTED</b>"}

👤 <b>Name</b>
${request.name}

📱 <b>Mobile</b>
${request.phoneNumber}

🕒 <b>${approved ? "Approved" : "Rejected"}</b>

${formatDateTime(

    approved
        ? request.approvedAt
        : request.rejectedAt

)}

━━━━━━━━━━━━━━━━━━
`;

};