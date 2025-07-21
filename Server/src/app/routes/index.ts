import { Router } from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: authRoutes,
  },
  // {
  //   path: "/user",
  //   route: UserRoutes,
  // },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

// router.use("/user", UserRoutes);
// router.use("/tour", TourRoutes);
// router.use("/division", DivisionRoutes);
// router.use("/booking", BookingRoutes);
// router.use("/guide", GuideRoutes);
