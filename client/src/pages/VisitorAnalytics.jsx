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

    const [selectedVisitor, setSelectedVisitor] =
        useState(null);

    // Selected visitor IDs
    const [selectedVisitors, setSelectedVisitors] =
        useState([]);

    // Delete loading state
    const [deleting, setDeleting] =
        useState(false);

    const navigate = useNavigate();


    // Load analytics
    const loadAnalytics = async () => {

        try {

            const summaryData =
                await visitorService.getSummary();

            const visitorData =
                await visitorService.getVisitors();

            setSummary(summaryData);

            setVisitors(visitorData);

        } catch (error) {

            console.error(error);

        }

    };


    // Open visitor details
    const openVisitor = async (id) => {

        try {

            const visitor =
                await visitorService.getVisitorById(id);

            setSelectedVisitor(visitor);

        } catch (error) {

            console.error(error);

        }

    };


    // Select / deselect one visitor
    const toggleVisitorSelection = (
        visitorId
    ) => {

        setSelectedVisitors((previous) => {

            if (previous.includes(visitorId)) {

                return previous.filter(
                    (id) => id !== visitorId
                );

            }

            return [
                ...previous,
                visitorId,
            ];

        });

    };


    // Select / deselect all visitors
    const toggleSelectAll = () => {

        if (
            selectedVisitors.length ===
            visitors.length
        ) {

            setSelectedVisitors([]);

            return;

        }

        setSelectedVisitors(
            visitors.map(
                (visitor) => visitor.visitorId
            )
        );

    };


    // Delete selected visitors
    const handleDeleteSelected = async () => {

        if (selectedVisitors.length === 0) {

            return;

        }


        const confirmed = window.confirm(

            `Are you sure you want to permanently delete ${selectedVisitors.length} selected visitor${selectedVisitors.length > 1 ? "s" : ""}?`

        );


        if (!confirmed) {

            return;

        }


        try {

            setDeleting(true);


            const response =
                await visitorService.deleteVisitors(
                    selectedVisitors
                );


            console.log(
                "Visitors deleted:",
                response
            );


            // Clear selection
            setSelectedVisitors([]);


            // Reload analytics
            await loadAnalytics();


            alert(
                response.message ||
                "Visitors deleted successfully."
            );


        } catch (error) {

            console.error(
                "Failed to delete visitors:",
                error
            );


            alert(
                error.response?.data?.message ||
                "Failed to delete visitors."
            );

        } finally {

            setDeleting(false);

        }

    };


    useEffect(() => {

        loadAnalytics();

    }, []);


    const allSelected =
        visitors.length > 0 &&
        selectedVisitors.length ===
            visitors.length;


    return (

        <div className="p-6">

            {/* Header */}

            <div
                className="
                    flex
                    justify-between
                    items-center
                    mb-8
                    gap-4
                    flex-wrap
                "
            >

                <h1 className="text-3xl font-bold">

                    Visitor Analytics

                </h1>


                <button
                    onClick={() =>
                        navigate(
                            "/admin/dashboard"
                        )
                    }
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


            {/* Summary Cards */}

            <div
                className="
                    grid
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-6
                    mb-8
                "
            >

                <SummaryCard
                    title="Total Visitors"
                    value={
                        summary?.totalVisitors ?? 0
                    }
                    icon="👥"
                />


                <SummaryCard
                    title="Total Visits"
                    value={
                        summary?.totalVisits ?? 0
                    }
                    icon="📈"
                />


                <SummaryCard
                    title="Linked Requests"
                    value={
                        summary?.linkedRequests ?? 0
                    }
                    icon="📋"
                />


                <SummaryCard
                    title="Linked Occupants"
                    value={
                        summary?.linkedOccupants ?? 0
                    }
                    icon="🏠"
                />

            </div>


            {/* Recent Visitors Header */}

            <div
                className="
                    flex
                    justify-between
                    items-center
                    mb-4
                    gap-4
                    flex-wrap
                "
            >

                <h2
                    className="
                        text-2xl
                        font-semibold
                    "
                >

                    Recent Visitors

                </h2>


                {/* Delete Controls */}

                <div
                    className="
                        flex
                        items-center
                        gap-3
                        flex-wrap
                    "
                >

                    {/* Select All */}

                    <button
                        onClick={toggleSelectAll}
                        disabled={
                            visitors.length === 0
                        }
                        className="
                            px-4
                            py-2
                            rounded-lg
                            border
                            border-slate-300
                            bg-white
                            hover:bg-slate-100
                            transition
                            cursor-pointer
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        {allSelected
                            ? "☐ Deselect All"
                            : "☑ Select All"}

                    </button>


                    {/* Delete Selected */}

                    <button
                        onClick={
                            handleDeleteSelected
                        }
                        disabled={
                            selectedVisitors.length ===
                                0 ||
                            deleting
                        }
                        className="
                            px-4
                            py-2
                            rounded-lg
                            bg-red-600
                            hover:bg-red-700
                            text-white
                            font-semibold
                            transition
                            cursor-pointer
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        "
                    >

                        {deleting
                            ? "Deleting..."
                            : `🗑 Delete Selected${
                                selectedVisitors.length > 0
                                    ? ` (${selectedVisitors.length})`
                                    : ""
                            }`}

                    </button>

                </div>

            </div>


            {/* Visitors Table */}

            <div
                className="
                    overflow-x-auto
                    bg-white
                    rounded-xl
                    shadow-md
                "
            >

                <table
                    className="
                        w-full
                        min-w-[850px]
                    "
                >

                    <thead
                        className="
                            bg-slate-100
                        "
                    >

                        <tr>

                            {/* Select column */}

                            <th
                                className="
                                    border
                                    p-2
                                    w-12
                                "
                            >

                                <input
                                    type="checkbox"
                                    checked={
                                        allSelected
                                    }
                                    onChange={
                                        toggleSelectAll
                                    }
                                    disabled={
                                        visitors.length ===
                                        0
                                    }
                                    onClick={(event) =>
                                        event.stopPropagation()
                                    }
                                    className="
                                        w-4
                                        h-4
                                        cursor-pointer
                                    "
                                />

                            </th>


                            <th
                                className="
                                    border
                                    p-2
                                "
                            >
                                Visitor ID
                            </th>


                            <th
                                className="
                                    border
                                    p-2
                                "
                            >
                                Browser
                            </th>


                            <th
                                className="
                                    border
                                    p-2
                                "
                            >
                                OS
                            </th>


                            <th
                                className="
                                    border
                                    p-2
                                "
                            >
                                Device
                            </th>


                            <th
                                className="
                                    border
                                    p-2
                                "
                            >
                                Last Visit
                            </th>


                            <th
                                className="
                                    border
                                    p-2
                                "
                            >
                                Visit Count
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        {visitors.length === 0 ? (

                            <tr>

                                <td
                                    colSpan="7"
                                    className="
                                        border
                                        p-6
                                        text-center
                                        text-slate-500
                                    "
                                >

                                    No visitors found.

                                </td>

                            </tr>

                        ) : (

                            visitors.map(
                                (visitor) => {

                                    const isSelected =
                                        selectedVisitors.includes(
                                            visitor.visitorId
                                        );


                                    return (

                                        <tr

                                            key={
                                                visitor._id
                                            }

                                            onClick={() =>
                                                openVisitor(
                                                    visitor._id
                                                )
                                            }

                                            className={`
                                                cursor-pointer
                                                transition
                                                ${
                                                    isSelected
                                                        ? "bg-red-50"
                                                        : "hover:bg-slate-50"
                                                }
                                            `}

                                        >

                                            {/* Checkbox */}

                                            <td
                                                className="
                                                    border
                                                    p-2
                                                    text-center
                                                "
                                                onClick={(
                                                    event
                                                ) =>
                                                    event.stopPropagation()
                                                }
                                            >

                                                <input

                                                    type="checkbox"

                                                    checked={
                                                        isSelected
                                                    }

                                                    onChange={() =>
                                                        toggleVisitorSelection(
                                                            visitor.visitorId
                                                        )
                                                    }

                                                    className="
                                                        w-4
                                                        h-4
                                                        cursor-pointer
                                                    "

                                                />

                                            </td>


                                            {/* Visitor ID */}

                                            <td
                                                className="
                                                    border
                                                    p-2
                                                "
                                            >

                                                {
                                                    visitor.visitorId
                                                }

                                            </td>


                                            {/* Browser */}

                                            <td
                                                className="
                                                    border
                                                    p-2
                                                "
                                            >

                                                {
                                                    visitor.browser
                                                }

                                            </td>


                                            {/* OS */}

                                            <td
                                                className="
                                                    border
                                                    p-2
                                                "
                                            >

                                                {
                                                    visitor.operatingSystem
                                                }

                                            </td>


                                            {/* Device */}

                                            <td
                                                className="
                                                    border
                                                    p-2
                                                "
                                            >

                                                {
                                                    visitor.deviceType
                                                }

                                            </td>


                                            {/* Last Visit */}

                                            <td
                                                className="
                                                    border
                                                    p-2
                                                "
                                            >

                                                {
                                                    visitor.lastVisit

                                                        ? new Date(
                                                            visitor.lastVisit
                                                        ).toLocaleString()

                                                        : "N/A"
                                                }

                                            </td>


                                            {/* Visit Count */}

                                            <td
                                                className="
                                                    border
                                                    p-2
                                                "
                                            >

                                                {
                                                    visitor.visitCount
                                                }

                                            </td>

                                        </tr>

                                    );

                                }
                            )

                        )}

                    </tbody>

                </table>

            </div>


            {/* Visitor Details Modal */}

            <VisitorDetailsModal

                visitor={
                    selectedVisitor
                }

                onClose={() =>
                    setSelectedVisitor(null)
                }

            />

        </div>

    );

}