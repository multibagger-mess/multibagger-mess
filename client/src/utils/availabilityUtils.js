export function getAvailabilityStatus(availableBeds) {

    if (availableBeds >= 5) {

        return {
            label: "🟢 Good Availability",
            background: "bg-green-100",
            text: "text-green-800",
        };

    }

    if (availableBeds >= 2) {

        return {
            label: "🟠 Limited Beds",
            background: "bg-amber-100",
            text: "text-amber-800",
        };

    }

    return {
        label: "🔴 Hostel Full",
        background: "bg-red-100",
        text: "text-red-800",
    };

}