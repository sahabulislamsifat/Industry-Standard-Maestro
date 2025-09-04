import App from "@/App";
import About from "@/pages/About";
import Login from "@/pages/auth/LogIn";
import Register from "@/pages/auth/Register";
import Verify from "@/pages/auth/Verify";
import Home from "@/pages/Home";
import { createBrowserRouter } from "react-router";

export const router = createBrowserRouter([
  {
    Component: App,
    path: "/",
    children: [
      {
        Component: Home,
        path: "/",
      },
      {
        Component: About,
        path: "about",
      },
    ],
  },
  {
    Component: Register,
    path: "register",
  },
  {
    Component: Login,
    path: "login",
  },
  {
    Component: Verify,
    path: "verify",
  },
]);
