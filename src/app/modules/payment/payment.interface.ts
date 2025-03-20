import { Types } from 'mongoose';

export interface IPayment {
  tenantId: Types.ObjectId;
  requestId: Types.ObjectId;
  listingId: Types.ObjectId;
  method: 'COD' | 'Online';
  status: 'Pending' | 'Paid' | 'Failed'| 'Cancelled';
  transactionId?: string;
  amount: number;
  createdAt?: Date;
  updatedAt?: Date;
}
