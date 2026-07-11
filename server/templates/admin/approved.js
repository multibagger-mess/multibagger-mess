const formatDateTime = (date = new Date()) => {
    return date.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const approvedTemplate = ({
    name,
    phoneNumber,
}) => {

    return `
🏠 <b>The Multi-Bagger Mess</b>

━━━━━━━━━━━━━━━━━━

✅ <b>REQUEST APPROVED</b>

👤 <b>Name</b>
${name}

📱 <b>Mobile</b>
${phoneNumber}

🕒 <b>Approved</b>
${formatDateTime()}

━━━━━━━━━━━━━━━━━━

🔐 Secure access link generated.
`;
};

module.exports = approvedTemplate;