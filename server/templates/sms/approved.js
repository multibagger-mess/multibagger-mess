const approvedSMSTemplate = (request) => {

    const accessLink =
        `${process.env.APP_URL}/access/${request.accessToken}`;

    return `🏠 The Multi-Bagger Mess

Hello ${request.name},

🎉 Congratulations!

Your request has been approved.

━━━━━━━━━━━━━━

✅ OPTION 1 (Recommended)

Open your hostel details directly:

${accessLink}

━━━━━━━━━━━━━━

🌐 OPTION 2

If you prefer accessing through the website:

1. Visit

https://multibagger-mess.vercel.app

2. Click

"View Hostel Details"

3. Enter your registered mobile number

4. Submit

━━━━━━━━━━━━━━

⏳ This secure access expires in 5 days.

Thank you.

The Multi-Bagger Mess`;

};

module.exports = approvedSMSTemplate;