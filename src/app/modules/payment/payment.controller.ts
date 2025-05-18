import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import Payment from "./payment.model";

// ✅ Create a new payment
export async function createPayment(req: Request, res: Response) {
   try {
      const { tenantId, requestId, listingId, method, status, transactionId, amount } = req.body;
    console.log('payement bod ', req.body)
      const newPayment = new Payment({
         tenantId,
         requestId,
         listingId,
         transactionId,
         amount,
         createdAt: new Date(),
      });

      await newPayment.save();

      res.status(StatusCodes.CREATED).json({ success: true, data: newPayment });
   } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
   }
}

// ✅ Get payment by payment ID
export async function getPaymentById(req: Request, res: Response) {
   try {
      const { id } = req.params;
      const payment = await Payment.findById(id);

      if (!payment) {
        res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Payment not found" });
      }

      res.status(StatusCodes.OK).json({ success: true, data: payment });
   } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
   }
}

// ✅ Get payments for a tenant by tenantId
export async function getPaymentsByTenantId(req: Request, res: Response) {
   try {
      console.log('rrrrrr', req.params)
      const { tenantId } = req.params;
      const payments = await Payment.find({ tenantId: tenantId });
      console.log('p', payments)
      if (!payments.length) {
          res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "No payments found for this tenant" });
          return
      }

       res.status(StatusCodes.OK).json({ success: true, data: payments });
   } catch (error: any) {
      //res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
   }
}

// ✅ Get payments for a landlord by landlordId (listingId reference)
export async function getPaymentsByLandlordId(req: Request, res: Response) {
   try {
      const { landlordId } = req.params;
      const payments = await Payment.find({ listingId: landlordId });

      if (!payments.length) {
          res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "No payments found for this landlord" });
      }

      res.status(StatusCodes.OK).json({ success: true, data: payments });
   } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
   }
}

// ✅ Get all payments
export async function getAllPayments(_req: Request, res: Response) {
   try {
      const payments = await Payment.find();

      if (!payments.length) {
        res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "No payments found" });
      }

      res.status(StatusCodes.OK).json({ success: true, data: payments });
   } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
   }
}

// ✅ Update payment status
export async function updatePaymentStatus(req: Request, res: Response) {
   try {
      const { id } = req.params;
      const { status, transactionId } = req.body;

      const payment = await Payment.findByIdAndUpdate(
         id,
         { status, transactionId, updatedAt: new Date() },
         { new: true }
      );

      if (!payment) {
          res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Payment not found" });
      }

      res.status(StatusCodes.OK).json({ success: true, data: payment });
   } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
   }
}

// ✅ Delete payment by ID
export async function deletePayment(req: Request, res: Response) {
   try {
      const { id } = req.params;

      const payment = await Payment.findByIdAndDelete(id);

      if (!payment) {
          res.status(StatusCodes.NOT_FOUND).json({ success: false, message: "Payment not found" });
      }

      res.status(StatusCodes.OK).json({ success: true, message: "Payment deleted successfully" });
   } catch (error: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ success: false, message: error.message });
   }
}

export const PaymentController = {
  createPayment,
  getPaymentById,
  deletePayment,
  getAllPayments,
  getPaymentsByLandlordId,
  getPaymentsByTenantId,
  updatePaymentStatus
}