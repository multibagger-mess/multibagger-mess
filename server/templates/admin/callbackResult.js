module.exports = ({
    request,
    status,
}) => {

    const statusText =
        status === "Approved"
            ? "✅ APPROVED"
            : "❌ REJECTED";

    return `
🏠 <b>The Multi-Bagger Mess</b>

━━━━━━━━━━━━━━━━━━

${statusText}

👤 <b>Name</b>
${request.name}

📱 <b>Mobile</b>
${request.phoneNumber}

━━━━━━━━━━━━━━━━━━
`;

};