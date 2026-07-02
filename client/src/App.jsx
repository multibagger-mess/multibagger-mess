import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RequestAccess from "./pages/RequestAccess";
import WaitingPage from "./pages/WaitingPage";
import DetailsPage from "./pages/DetailsPage";
import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/request-access" element={<RequestAccess />} />
      <Route path="/waiting" element={<WaitingPage />} />
      <Route path="/details" element={<DetailsPage />} />
      <Route path="/admin" element={<AdminDashboard />} />
    </Routes>
  );
}

export default App;