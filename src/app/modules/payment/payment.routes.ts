import express from "express";
import { PaymentController } from "./payment.controller";


const router = express.Router();

//Route to create a new payment
router.post("/", PaymentController.createPayment);

//Route to get payment by payment ID
 router.get("/:id", PaymentController.getPaymentById);

// Route to get payments by tenantId
router.get("/tenant/:tenantId", PaymentController.getPaymentsByTenantId);

// Route to get payments by landlordId (listingId reference)
router.get("/landlord/:landlordId", PaymentController.getPaymentsByLandlordId);

// Route to get all payments
router.get("/", PaymentController.getAllPayments);

// Route to update payment status
router.put("/:id", PaymentController.updatePaymentStatus);

// Route to delete payment by ID
router.delete("/:id", PaymentController.deletePayment);

export const PaymentRoutes= router;
