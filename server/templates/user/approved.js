const formatDateTime = (date) => {
    return new Date(date).toLocaleString("en-IN", {
        dateStyle: "medium",
        timeStyle: "short",
    });
};

const approvedTemplate = ({
    name,
    accessToken,
    accessExpiresAt,
}) => {

    const accessLink =
        `${process.env.APP_URL}/access/${accessToken}`;

    return `
🏠 <b>The Multi-Bagger Mess</b>

━━━━━━━━━━━━━━━━━━

🎉 <b>YOUR REQUEST HAS BEEN APPROVED</b>

Hello <b>${name}</b>,

Your request has been approved successfully.

━━━━━━━━━━━━━━━━━━

🔐 <b>Secure Access Link</b>

<a href="${accessLink}">View Hostel Details</a>

━━━━━━━━━━━━━━━━━━

⏳ <b>Valid Until</b>

${formatDateTime(accessExpiresAt)}

━━━━━━━━━━━━━━━━━━

⚠️ This link is personal.

Please do not share it with anyone.
`;
};

module.exports = approvedTemplate;