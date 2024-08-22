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
import UnauthorizedPage from "../components/Unauth";
import { Navigate } from "react-router-dom";

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
        path: "/inventory/cutting",
        element: <ProtectedRoutes element={<CuttingInventory />} />,
      },
      {
        path: "/inventory/ready",
        element: <ProtectedRoutes element={<ReadyInventory />} />,
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
        path: "/not-authorized",
        element: <UnauthorizedPage />,
      },
      {
        path: "*",
        element: <div>error page</div>,
      },
    ],
  },
]);
