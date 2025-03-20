import mongoose, { Schema, Types } from "mongoose";
import { IPayment } from "./payment.interface";

const PaymentSchema: Schema = new Schema(
  {
    tenantId: { type: Types.ObjectId, ref: "User", required: true },
    requestId: { type: Types.ObjectId, ref: "Request", required: true },
    listingId: { type: Types.ObjectId, ref: "Rental", required: true },
    method: { type: String, enum: ["COD", "Online"], default:'COD' },
    status: { type: String, enum: ["Pending", "Paid", "Failed", "Cancelled"], default: "Pending" },
    transactionId: { type: String },
    amount: { type: Number, required: true },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

// Export the Payment model
const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
export default Payment;