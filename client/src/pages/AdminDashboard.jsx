import { useEffect, useState } from "react";
import adminService from "../services/adminService";

export default function AdminDashboard() {

  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const pendingCount = requests.filter(
    (request) => request.status === "Pending"
).length;

const approvedCount = requests.filter(
    (request) => request.status === "Approved"
).length;

const rejectedCount = requests.filter(
    (request) => request.status === "Rejected"
).length;
const filteredRequests = requests.filter((request) => {

    const search = searchTerm.toLowerCase();

    return (

        request.name.toLowerCase().includes(search) ||

        request.phoneNumber.includes(search)

    );

});

  //FIRST FUNCTION
  const loadRequests = async () => {

    const response = await adminService.getAllRequests();

    if (response.success) {
      setRequests(response.data);
    }

  };

  const updateStatus = async (id, status) => {

    const response = await adminService.updateRequestStatus(
        id,
        status
    );

    if (response.success) {
        loadRequests();
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
            maxWidth: "900px",
            margin: "40px auto",
            padding: "20px",
        }}>

    {/* ADD THIS */}

        <div
            style={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "20px",
            }}
        >

            <button

                onClick={() => {

                    localStorage.removeItem("adminToken");

                    window.location.href = "/admin/login";

                }}

                style={{

                    backgroundColor:"#dc2626",

                    color:"white",

                    border:"none",

                    padding:"10px 18px",

                    borderRadius:"8px",

                    cursor:"pointer",

                }}

            >

                Logout

            </button>

        </div>

        {/* END */}

      <h1 style={{ 
        fontSize: "36px", 
        marginBottom: "10px",
         color: "#1e293b", }}>
          
          Admin Dashboard
          
          </h1>
          <div
    style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "20px",
    }}
>

<button

    onClick={() => {

        localStorage.removeItem("adminToken");

        window.location.href="/admin/login";

    }}

    style={{

        background:"#dc2626",

        color:"white",

        border:"none",

        padding:"10px 18px",

        borderRadius:"8px",

        cursor:"pointer",

    }}

>

Logout

</button>

</div>

      <div
    style={{
        marginBottom: "30px",
        lineHeight: "2",
        fontSize: "18px",
    }}
>
    <div>📋 Total Requests: {requests.length}</div>

    <div>🟡 Pending: {pendingCount}</div>

    <div>🟢 Approved: {approvedCount}</div>

    <div>🔴 Rejected: {rejectedCount}</div>
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

      {filteredRequests.map((request) => (

        <div
          key={request._id}
          style={{
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    padding: "20px",
    marginBottom: "20px",
}}
        >

          <h3
    style={{
        fontSize: "24px",
        fontWeight: "600",
        marginBottom: "12px",
        color: "#1e293b",
    }}
>
    👤 {request.name}
</h3>

          <p
    style={{
        color: "#475569",
        marginBottom: "10px",
        fontSize: "16px",
    }}
>
    📞 {request.phoneNumber}
</p>
<p
    style={{
        color: "#64748b",
        fontSize: "15px",
        marginBottom: "12px",
    }}
>
    📅 Submitted:{" "}
    {new Date(request.createdAt).toLocaleString()}
</p>

          <p
    style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        fontSize: "16px",
        marginBottom: "20px",
    }}
>
    Status :{" "}
    <span
        style={{
            padding: "6px 12px",
            borderRadius: "20px",
            color: "white",
            fontWeight: "bold",
            backgroundColor:
                request.status === "Approved"
                    ? "#16a34a"
                    : request.status === "Rejected"
                    ? "#dc2626"
                    : "#f59e0b",
        }}
    >
        {request.status}
    </span>
</p>
          <br />

<div style={{ marginTop: "20px" }}>

<button
  onClick={() => updateStatus(request._id, "Approved")}
  disabled={request.status === "Approved"}
  style={{
    backgroundColor: "#16a34a",
    color: "white",
    border: "none",
    padding: "10px 18px",
    marginRight: "10px",
    borderRadius: "6px",
    cursor:
      request.status === "Approved"
        ? "not-allowed"
        : "pointer",
    opacity:
      request.status === "Approved"
        ? 0.6
        : 1,
  }}
>
  {request.status === "Approved"
    ? "✓ Approved"
    : "Approve"}
</button>

<button
  onClick={() => updateStatus(request._id, "Rejected")}
  disabled={request.status === "Rejected"}
  style={{
    backgroundColor: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 18px",
    borderRadius: "6px",
    cursor:
      request.status === "Rejected"
        ? "not-allowed"
        : "pointer",
    opacity:
      request.status === "Rejected"
        ? 0.6
        : 1,
  }}
>
  {request.status === "Rejected"
    ? "✗ Rejected"
    : "Reject"}
</button>
</div>

        </div>

      ))}

    </div>

  );
}