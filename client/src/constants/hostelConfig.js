export const HOSTEL_CONFIG = {
    // Basic Information
    hostelName: "The Multi-Bagger Mess",

    // Capacity
    totalBeds: 10,
    founderSlots: 10,

    // Pricing
    monthlyRent: 2000,
    cleaningCharge: 150,

    get totalMonthlyFee() {
        return this.monthlyRent + this.cleaningCharge;
    },

    // Contact
    location: "Purulia",

    // Tagline
    tagline:
        "A peaceful and student-friendly hostel near J.K. College.",
};