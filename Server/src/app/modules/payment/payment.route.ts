import express from "express";
// import { UserRole } from "../user/user.interface";
// import { checkAuth } from "../../middlewares/checkAuth";
import { PaymentController } from "./payment.controller";

const router = express.Router();

router.post("/init-payment/:bookingId", PaymentController.initPayment);
router.post("/success", PaymentController.successPayment);
router.post("/fail", PaymentController.failPayment);
router.post("/cancel", PaymentController.cancelPayment);
// router.get(
//   "/invoice/:paymentId",
//   checkAuth(...Object.values(UserRole)),
//   PaymentController.getInvoiceDownloadUrl
// );
// router.post("/validate-payment", PaymentController.validatePayment);

export const PaymentRoutes = router;
