import App from "@/App";
import DashboardLayout from "@/components/layouts/DashboardLayout";
import { role } from "@/constants/role";
import About from "@/pages/About";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import Verify from "@/pages/auth/Verify";
import type { TRole } from "@/types";
import { withAuth } from "@/utils/withAuth";
import { createBrowserRouter, Navigate } from "react-router";
import { generateRoutes } from "@/utils/generateRoute";
import { adminSidebarItems } from "./adminSidebarItem";
import { userSidebarItems } from "./userSidebarItem";
import NotFound from "@/pages/NotFound";
import Tours from "@/pages/user/Tours";
import TourDetails from "@/pages/user/TourDetails";
import Home from "@/pages/Home";
import Booking from "@/pages/user/Booking";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        index: true,
      },
      {
        Component: About,
        path: "about",
      },
      {
        Component: Tours,
        path: "tours",
      },
      {
        Component: TourDetails,
        path: "tours/:id",
      },
      {
        Component: withAuth(Booking),
        path: "booking/:id",
      },
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.superAdmin as TRole),
    path: "/admin",
    children: [
      { index: true, element: <Navigate to="/admin/analytics" /> },
      ...generateRoutes(adminSidebarItems),
    ],
  },
  {
    Component: withAuth(DashboardLayout, role.user as TRole),
    path: "/user",
    children: [
      { index: true, element: <Navigate to="/user/bookings" /> },
      ...generateRoutes(userSidebarItems),
    ],
  },
  {
    Component: Login,
    path: "/login",
  },
  {
    Component: Register,
    path: "/register",
  },
  {
    Component: Verify,
    path: "/verify",
  },
  {
    Component: NotFound,
    path: "/not-found",
  },
]);
