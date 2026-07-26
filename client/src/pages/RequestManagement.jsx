import { useEffect, useState } from "react";
import adminService from "../services/adminService";
import AdminHeader from "../components/AdminHeader";
import StatCard from "../components/ui/StatCard";
import RequestCard from "../components/requests/RequestCard";
import ConfirmationModal from "../components/ui/ConfirmationModal";
import toast from "react-hot-toast";

export default function AdminDashboard() {

  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [loadingAction, setLoadingAction] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
).length;

const approvedCount = requests.filter(
    (request) => request.status === "Approved"
).length;

const rejectedCount = requests.filter(
    (request) => request.status === "Rejected"
).length;

const expiredCount = requests.filter(
    (request) => request.status === "Expired"
).length;

const filteredRequests = requests.filter((request) => {

    const search = searchTerm.toLowerCase();

    const matchesSearch =
        request.name.toLowerCase().includes(search) ||
        request.phoneNumber.includes(search);

    const matchesStatus =
        statusFilter === "All" ||
        request.status === statusFilter;

    return matchesSearch && matchesStatus;

});

  //FIRST FUNCTION
  const loadRequests = async () => {

    const response = await adminService.getAllRequests();

    if (response.success) {
      setRequests(response.data);
    }

  };

const updateStatus = async (id, status) => {

    try {

        setLoadingAction(`${status}-${id}`);

        const response =
            await adminService.updateRequestStatus(
                id,
                status
            );

        if (response.success) {

            toast.success(
                `Request ${status.toLowerCase()} successfully.`
            );

            await loadRequests();

        }

    }

    catch (error) {

        toast.error(

            error.response?.data?.message ||

            `Unable to ${status.toLowerCase()} request.`

        );

    }

    finally {

        setLoadingAction(null);

    }

};

const handleDeleteRequest = (id) => {

    setSelectedRequestId(id);

    setDeleteModalOpen(true);

};

const confirmDeleteRequest = async () => {

    try {

        setLoadingAction(`Delete-${selectedRequestId}`);

        const response =
            await adminService.deleteRequest(selectedRequestId);

        if (response.success) {

            toast.success(
                "Request deleted successfully."
            );

            await loadRequests();

        }

    }

    catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Unable to delete request."

        );

    }

    finally {

        setLoadingAction(null);

        setDeleteModalOpen(false);

        setSelectedRequestId(null);

    }

};

useEffect(() => {
    const fetchRequests = async () => {
        await loadRequests();
    };

    fetchRequests();
}, []);

  return (

    <div style={{
            maxWidth: "1200px",
            margin: "40px auto",
            padding: "20px",
        }}>

        {/* END */}

        <AdminHeader
            title="Request Management"
        />
          
<div
    style={{
        display: "grid",
        gridTemplateColumns:
            "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "20px",
        marginBottom: "30px",
    }}
>

    <StatCard
        title="Total Requests"
        value={requests.length}
        bg="#ffffff"
    />

    <StatCard
        title="Pending"
        value={pendingCount}
        bg="#fef3c7"
    />

    <StatCard
        title="Approved"
        value={approvedCount}
        bg="#dcfce7"
    />

    <StatCard
        title="Expired"
        value={expiredCount}
        bg="#ffedd5"
    />

    <StatCard
        title="Rejected"
        value={rejectedCount}
        bg="#fee2e2"
    />

</div>

      <hr />

      <div
            style={{
                margin: "25px 0",
            }}
      >

    <input
        type="text"
        placeholder="🔍 Search by Name or Phone Number..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
            width: "100%",
            padding: "12px",
            fontSize: "16px",
            borderRadius: "8px",
            border: "1px solid #cbd5e1",
            outline: "none",
        }}
    />

        </div>

        <div
    style={{
        display: "flex",
        gap: "12px",
        flexWrap: "wrap",
        marginBottom: "30px",
    }}
>

    {[
        "All",
        "Pending",
        "Approved",
        "Expired",
        "Rejected",
    ].map((status) => (

        <button
            key={status}
            onClick={() => setStatusFilter(status)}
            style={{
                padding: "10px 18px",
                borderRadius: "8px",
                border: "none",
                cursor: "pointer",
                fontWeight: "600",

                backgroundColor:
                    statusFilter === status
                        ? "#2563eb"
                        : "#e2e8f0",

                color:
                    statusFilter === status
                        ? "white"
                        : "#1e293b",

                transition: "0.2s",
            }}
        >
            {status}
        </button>

    ))}

</div>

{filteredRequests.length === 0 ? (

    <div
        style={{
            textAlign: "center",
            padding: "80px 20px",
            background: "#ffffff",
            borderRadius: "14px",
            boxShadow:
                "0 6px 16px rgba(0,0,0,0.08)",
        }}
    >

        <div
            style={{
                fontSize: "48px",
                marginBottom: "16px",
            }}
        >
            🔍
        </div>

        <h2
            style={{
                color: "#334155",
                marginBottom: "10px",
            }}
        >
            No requests found
        </h2>

        <p
            style={{
                color: "#64748b",
                fontSize: "16px",
            }}
        >
            Try another search or change the filter.
        </p>

    </div>

) : (

    filteredRequests.map((request) => (

        <RequestCard
            key={request._id}
            request={request}
            loadingAction={loadingAction}
            onApprove={(id) => updateStatus(id, "Approved")}
            onReject={(id) => updateStatus(id, "Rejected")}
            onDelete={handleDeleteRequest}
        />

    ))

)}

<ConfirmationModal
    open={deleteModalOpen}
    title="Delete Request"
    message="Are you sure you want to permanently delete this request? This action cannot be undone."
    confirmText="Delete"
    confirmColor="#dc2626"
    onCancel={() => {

        setDeleteModalOpen(false);

        setSelectedRequestId(null);

    }}
    onConfirm={confirmDeleteRequest}
/>

    </div>

  );
}