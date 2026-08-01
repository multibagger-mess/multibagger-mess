const formatDateTime = (date = new Date()) => {
    return date.toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const newRequestTemplate = ({ name, phoneNumber }) => {

    const dashboardLink =
        `${process.env.APP_URL}/admin/requests`;

    return `
🏠 <b>The Multi-Bagger Mess</b>

━━━━━━━━━━━━━━━━━━

🔔 <b>NEW ACCESS REQUEST</b>

👤 <b>Name</b>
${name}

📱 <b>Mobile</b>
${phoneNumber}

🕒 <b>Submitted</b>
${formatDateTime()}

━━━━━━━━━━━━━━━━━━
`;
};

module.exports = newRequestTemplate;