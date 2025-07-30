import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createDivisionSchema,
  updateDivisionSchema,
} from "./division.validation";
import { DivisionController } from "./division.controller";

const router = Router();

router.post(
  "/create",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(createDivisionSchema),
  DivisionController.createDivision
);

router.get("/", DivisionController.getAllDivisions);

router.get("/:slug", DivisionController.getSingleDivision);

router.patch(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  validateRequest(updateDivisionSchema),
  DivisionController.updateDivision
);

router.delete(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DivisionController.deleteDivision
);

export const DivisionRoutes = router;
