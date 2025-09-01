import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { UserRole } from "../user/user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import {
  createDivisionSchema,
  updateDivisionSchema,
} from "./division.validation";
import { DivisionController } from "./division.controller";
import { multerUpload } from "../../config/multer.config";

const router = Router();

/*
 {
file : Image
data : body text data => req.body => req.body.data
 }
*/

// Form data -> body, file
router.post(
  "/create",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(createDivisionSchema),
  DivisionController.createDivision
);

router.get("/", DivisionController.getAllDivisions);

router.get("/:slug", DivisionController.getSingleDivision);

router.patch(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  multerUpload.single("file"),
  validateRequest(updateDivisionSchema),
  DivisionController.updateDivision
);

router.delete(
  "/:id",
  checkAuth(UserRole.ADMIN, UserRole.SUPER_ADMIN),
  DivisionController.deleteDivision
);

export const DivisionRoutes = router;
