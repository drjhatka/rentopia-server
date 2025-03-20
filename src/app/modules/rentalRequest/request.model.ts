import mongoose, { Schema } from 'mongoose';
import { IRequest } from './request.interface';

const RequestSchema = new Schema<IRequest>(
   {
      tenantId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
      listingId: { type: Schema.Types.ObjectId, ref: 'Rental', required: true },
      landlordId: { type: Schema.Types.ObjectId, ref: 'User', required: true },

      message: { type: String, required: true },
      requestDate: { type: Date, default: Date.now, required:true },
      approvedDate: { type: Date },
      moveInDate: { type: Date },
      checkoutDate: { type: Date },

      status: {
         type: String,
         enum: ['approved', 'pending', 'completed'],
         default: 'pending',
      },

      transactionId: { type: String },
      landlordResponseMessage: { type: String, default:'' },

      // Tenant contact details (only revealed after approval)
      tenantPhone: { type: String },
      tenantEmail: { type: String },
   },
   { timestamps: true }
);

// Create and export the model
const RequestModel = mongoose.model<IRequest>('Request', RequestSchema);
export default RequestModel;
