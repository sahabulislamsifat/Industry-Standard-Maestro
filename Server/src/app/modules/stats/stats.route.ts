import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import { StatsController } from "./stats.controller";

const router = express.Router();

router.get(
  "/booking",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  StatsController.getBookingStats
);
router.get(
  "/payment",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  StatsController.getPaymentStats
);
router.get(
  "/user",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  StatsController.getUserStats
);
router.get(
  "/tour",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  StatsController.getTourStats
);

export const StatsRoutes = router;
