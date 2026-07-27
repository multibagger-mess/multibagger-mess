import { useEffect, useState } from "react";
import visitorService from "../services/visitorService";
import SummaryCard from "../components/admin/visitorAnalytics/SummaryCard";
import { useNavigate } from "react-router-dom";
import VisitorDetailsModal
from "../components/admin/visitorAnalytics/VisitorDetailsModal";

export default function VisitorAnalytics() {
    const [summary, setSummary] = useState({
        totalVisitors: 0,
        totalVisits: 0,
        linkedRequests: 0,
        linkedOccupants: 0,
    });
    const [visitors, setVisitors] = useState([]);

    const loadAnalytics = async () => {
        try {
            const summaryData = await visitorService.getSummary();
            const visitorData = await visitorService.getVisitors();

            setSummary(summaryData);
            setVisitors(visitorData);
        } catch (error) {
            console.error(error);
        }
    };

    const navigate = useNavigate();

    const [selectedVisitor, setSelectedVisitor] =
    useState(null);
    
    useEffect(() => {
        loadAnalytics();
    }, []);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-8">

                <h1 className="text-3xl font-bold">
                    Visitor Analytics
                </h1>

                <button
                    onClick={() => navigate("/admin/dashboard")}
                    className="
                        flex
                        items-center
                        gap-2
                        bg-white
                        border
                        border-slate-300
                        px-5
                        py-2
                        rounded-lg
                        hover:bg-slate-100
                        transition
                        cursor-pointer
                    "
                >
                    ⬅ Back to Dashboard
                </button>

            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

                <SummaryCard
                    title="Total Visitors"
                    value={summary?.totalVisitors ?? 0}
                    icon="👥"
                />

                <SummaryCard
                    title="Total Visits"
                    value={summary?.totalVisits ?? 0}
                    icon="📈"
                />

                <SummaryCard
                    title="Linked Requests"
                    value={summary?.linkedRequests ?? 0}
                    icon="📋"
                />

                <SummaryCard
                    title="Linked Occupants"
                    value={summary?.linkedOccupants ?? 0}
                    icon="🏠"
                />

            </div>

            <h2 className="text-2xl font-semibold mb-4">
                Recent Visitors
            </h2>

            <table
                className="
                    w-full
                    bg-white
                    rounded-xl
                    overflow-hidden
                    shadow-md
                "
            >
                <thead className="bg-slate-100">
                    <tr>
                        <th className="border p-2">Visitor ID</th>
                        <th className="border p-2">Browser</th>
                        <th className="border p-2">OS</th>
                        <th className="border p-2">Device</th>
                        <th className="border p-2">
                            Last Visit
                        </th>
                        <th className="border p-2">
                            Visit Count
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {visitors.map((visitor) => (
                        <tr
                            key={visitor._id}
                            onClick={() =>
                                setSelectedVisitor(visitor)
                            }
                            className="
                                hover:bg-slate-100
                                cursor-pointer
                                transition
                            "
                        >
                            <td className="border p-2">
                                {visitor.visitorId}
                            </td>

                            <td className="border p-2">
                                {visitor.browser}
                            </td>

                            <td className="border p-2">
                                {visitor.operatingSystem}
                            </td>

                            <td className="border p-2">
                                {visitor.deviceType}
                            </td>

                            <td className="border p-2">
                                {
                                    visitor.lastVisit
                                        ? new Date(
                                            visitor.lastVisit
                                        ).toLocaleString()
                                        : "N/A"
                                }
                            </td>

                            <td className="border p-2">
                                {visitor.visitCount}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <VisitorDetailsModal

                visitor={selectedVisitor}

                onClose={() =>
                    setSelectedVisitor(null)
                }

            />
            
        </div>
    );
}