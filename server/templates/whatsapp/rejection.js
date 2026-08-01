function rejectionTemplate({

    name,

    websiteUrl,

}) {

    return `🏠 *The Multi-Bagger Mess*

━━━━━━━━━━━━━━━━━━━━

Hello *${name},*

❌ *Request Rejected*

Unfortunately, your hostel access request could not be approved at this time.

━━━━━━━━━━━━━━━━━━━━

You may submit another request after the cooldown period.

━━━━━━━━━━━━━━━━━━━━

🌐 *Official Website*

${websiteUrl}

━━━━━━━━━━━━━━━━━━━━

Thank you for your interest in *The Multi-Bagger Mess.*

📚 We wish you success in your studies.

— *The Multi-Bagger Mess*`;

}

module.exports = rejectionTemplate;