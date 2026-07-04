import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RequestAccess from "./pages/RequestAccess";
import RequestSubmitted from "./pages/RequestSubmitted";
import WaitingPage from "./pages/WaitingPage";
import DetailsPage from "./pages/DetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import OccupantManagement from "./pages/OccupantManagement";
import { ROUTES } from "./constants/routes";

function App() {
  return (
    <Routes>
  <Route
    path={ROUTES.HOME}
    element={<LandingPage />}
  />

  <Route
    path={ROUTES.REQUEST_ACCESS}
    element={<RequestAccess />}
  />

  <Route
    path={ROUTES.REQUEST_SUBMITTED}
    element={<RequestSubmitted />}
  />

  <Route
    path={ROUTES.WAITING}
    element={<WaitingPage />}
  />

  <Route
    path={ROUTES.DETAILS}
    element={<DetailsPage />}
  />

  <Route
    path={ROUTES.ADMIN}
    element={<AdminDashboard />}
  />

  <Route
    path="/occupants"
    element={<OccupantManagement />}
  />
</Routes>
  );
}

export default App;