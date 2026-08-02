const formatDateTime = (date = new Date()) => {

    return date.toLocaleString("en-IN", {

        timeZone: "Asia/Kolkata",

        dateStyle: "medium",

        timeStyle: "short",

    });

};

module.exports = () => `

🏠 <b>The Multi-Bagger Mess</b>

━━━━━━━━━━━━━━━━━━

⚠️ <b>REQUEST NO LONGER AVAILABLE</b>

The following request has already been
deleted from <b>Request Management</b>.

👤 <b>Name</b>
${name}

📱 <b>Mobile</b>
${phoneNumber}

🕒 <b>Action Attempted</b>

${formatDateTime()}

━━━━━━━━━━━━━━━━━━

ℹ️ No further action can be performed on this request.

`;