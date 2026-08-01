function approvalTemplate({

    name,

    accessLink,

    websiteUrl,

}) {

    return `🏠 *The Multi-Bagger Mess*

━━━━━━━━━━━━━━━━━━━━

Hello *${name},*

🎉 *Congratulations!*

Your request has been *approved.*

━━━━━━━━━━━━━━━━━━━━

🔗 *View Hostel Details*

${accessLink}

━━━━━━━━━━━━━━━━━━━━

🌐 *Official Website*

${websiteUrl}

Tap *View Hostel Details* and enter your registered mobile number.

━━━━━━━━━━━━━━━━━━━━

⏳ *Access Validity*

• Valid for *5 days*
• Link can be used until it expires.

━━━━━━━━━━━━━━━━━━━━

Thank you for choosing *The Multi-Bagger Mess.*

📚 We wish you a comfortable and successful stay!

— *The Multi-Bagger Mess*`;

}

module.exports = approvalTemplate;