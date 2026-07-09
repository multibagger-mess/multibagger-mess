import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import RequestAccess from "./pages/RequestAccess";
import RequestSubmitted from "./pages/RequestSubmitted";
import WaitingPage from "./pages/WaitingPage";
import DetailsPage from "./pages/DetailsPage";
import AdminDashboard from "./pages/AdminDashboard";
import OccupantManagement from "./pages/OccupantManagement";
import ViewHostelDetails from "./pages/ViewHostelDetails";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { ROUTES } from "./constants/routes";
import AccessTokenPage from "./pages/AccessTokenPage";
import AdminLogin from "./pages/AdminLogin";
import AdminProtectedRoute from "./components/auth/AdminProtectedRoute";

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
    path={ROUTES.ACCESS_DETAILS}
    element={<ViewHostelDetails />}
  />

  <Route
    path={ROUTES.WAITING}
    element={<WaitingPage />}
  />

  <Route

      path={ROUTES.ACCESS_TOKEN}

      element={<AccessTokenPage />}

  />

  <Route
  path={ROUTES.DETAILS}
  element={
    <ProtectedRoute>
      <DetailsPage />
    </ProtectedRoute>
  }
  />

  <Route
    path={ROUTES.ADMIN_LOGIN}
    element={<AdminLogin />}
/>

<Route
    path={ROUTES.ADMIN_DASHBOARD}
    element={
        <AdminProtectedRoute>
            <AdminDashboard />
        </AdminProtectedRoute>
    }
/>

  <Route
    path="/occupants"
    element={<OccupantManagement />}
  />

</Routes>
  );
}

export default App;