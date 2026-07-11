const formatDateTime = (date = new Date()) => {
    return date.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const rejectedTemplate = ({
    name,
    phoneNumber,
}) => {

    return `
🏠 <b>The Multi-Bagger Mess</b>

━━━━━━━━━━━━━━━━━━

❌ <b>REQUEST REJECTED</b>

👤 <b>Name</b>
${name}

📱 <b>Mobile</b>
${phoneNumber}

🕒 <b>Rejected</b>
${formatDateTime()}
`;
};

module.exports = rejectedTemplate;