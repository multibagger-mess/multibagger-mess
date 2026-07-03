import { useEffect, useState } from "react";
import adminService from "../services/adminService";

export default function AdminDashboard() {

  const [requests, setRequests] = useState([]);

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

    <div style={{ padding: "30px" }}>

      <h1>Admin Dashboard</h1>

      <h2>Total Requests : {requests.length}</h2>

      <hr />

      {requests.map((request) => (

        <div
          key={request._id}
          style={{
            border: "1px solid gray",
            marginBottom: "15px",
            padding: "15px",
          }}
        >

          <h3>{request.name}</h3>

          <p>Phone : {request.phoneNumber}</p>

          <p>Status : {request.status}</p>
          <br />

<button
    onClick={() => updateStatus(request._id, "Approved")}
>
    Approve
</button>

        </div>

      ))}

    </div>

  );
}