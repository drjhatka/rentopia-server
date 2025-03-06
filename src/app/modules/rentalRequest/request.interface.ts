import { Types } from "mongoose";

export interface IRequest {
    tenantId:Types.ObjectId;
    listingId:Types.ObjectId;
    landlordId:Types.ObjectId;

    message:string;
    requestDate: Date;
    approvedDate?: Date;
    checkoutDate?:Date;
    status:'approved'|'pending'|'completed';
    transactionId?: string; // Payment transaction reference
    landlordResponseMessage?: string; // Reason for approval/rejection
    tenantPhone?: string;
    tenantEmail?: string;

}