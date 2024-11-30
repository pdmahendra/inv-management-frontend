import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Notifications from "../pages/Notifications";
import People from "../pages/People";
import RawInventory from "../pages/RawInventory";
import CuttingInventory from "../pages/CuttingInventory";
import ReadyInventory from "../pages/ReadyInventory";
import Login from "../pages/Login";
import ProtectedRoutes from "../components/ProtectedRoutes";
import { Navigate } from "react-router-dom";
import ProductionPage from "../pages/ProductionPage";
import StartNewProductionPage from "../pages/StartNewProductionPage";
import ViewLifecyclePage from "../pages/ViewLifecyclePage";
import StartNewLifecyclePage from "../pages/StartNewViewLifecyclePage";
import ViewDetails from "../pages/ViewDetails";
import IssuanceRecordPage from "../pages/IssuanceRecordPage";
import ProfilePage from "../pages/ProfilePage";
import ActivityLogs from "../pages/ActivityLogs";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <ProtectedRoutes element={<Home />} />,
      },
      {
        path: "/notifications",
        element: <ProtectedRoutes element={<Notifications />} />,
      },
      {
        path: "/people",
        element: (
          <ProtectedRoutes
            element={<People />}
            allowedRoles={["admin", "manager"]}
          />
        ),
      },
      {
        path: "/inventory/raw",
        element: <ProtectedRoutes element={<RawInventory />} />,
      },
      {
        path: "/production",
        element: <ProtectedRoutes element={<ProductionPage />} />,
      },
      {
        path: "/production/start-new",
        element: <ProtectedRoutes element={<StartNewProductionPage />} />,
      },
      {
        path: "/view-lifecycle",
        element: <ProtectedRoutes element={<ViewLifecyclePage />} />,
      },
      {
        path: "/view-lifecycle/start-new",
        element: <ProtectedRoutes element={<StartNewLifecyclePage />} />,
      },
      {
        path: "/view-lifecycle/details/:id",
        element: <ProtectedRoutes element={<ViewDetails />} />,
      },
      {
        path: "/issuance-records",
        element: <ProtectedRoutes element={<IssuanceRecordPage />} />,
      },
      {
        path: "/profile",
        element: <ProtectedRoutes element={<ProfilePage />} />,
      },
      {
        path: "/inventory/cutting",
        element: <ProtectedRoutes element={<CuttingInventory />} />,
      },
      {
        path: "/inventory/ready",
        element: <ProtectedRoutes element={<ReadyInventory />} />,
      },
      {
        path: "/activity-logs",
        element: <ProtectedRoutes element={<ActivityLogs />} />,
      },
      {
        path: "/login",
        element: localStorage.getItem("accessToken") ? (
          <Navigate to="/" replace />
        ) : (
          <Login />
        ),
      },
      {
        path: "*",
        element: <div>error page</div>,
      },
    ],
  },
]);
