const approvedSMSTemplate = (request) => {

    const accessLink =
        `${process.env.APP_URL}/access/${request.accessToken}`;

    return `🏠 The Multi-Bagger Mess

Hello ${request.name},

🎉 Congratulations!

Your request has been approved.

━━━━━━━━━━━━━━

🔗 Open your hostel details instantly:

${accessLink}

━━━━━━━━━━━━━━

🌐 Prefer using the website?

Visit:
https://multibagger-mess.vercel.app

Select "View Hostel Details" and enter your registered mobile number.

━━━━━━━━━━━━━━

⏳ Access expires in 5 days.

Thank you for choosing The Multi-Bagger Mess.

📚 We wish you a comfortable and successful stay!

— The Multi-Bagger Mess`;

};

module.exports = approvedSMSTemplate;