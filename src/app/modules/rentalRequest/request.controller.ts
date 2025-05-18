import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import AppError from '../../errors/appError';
import RequestModel from './request.model';

// CREATE a new request
export const createRequest = catchAsync(async (req: Request, res: Response) => {
   const request = await RequestModel.create(req.body);
   res.status(StatusCodes.CREATED).json({ success: true, data: request });
});


// GET all requests
export const getRequests = catchAsync(async (req: Request, res: Response) => {
   const requests = await RequestModel.find().populate('tenantId', 'name email').populate('listingId', 'title rent');
   res.status(StatusCodes.OK).json({ success: true, data: requests });
});

// GET a single request by ID
export const getRequestById = catchAsync(async (req: Request, res: Response) => {
   const request = await RequestModel.findById(req.params.id).populate('tenantId', 'name email').populate('listingId', 'title');
   if (!request) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Request not found');
   }
   res.status(StatusCodes.OK).json({ success: true, data: request });
});


//Get all requests based on status related to tenant ID
export const getRequestsByTenantID = catchAsync(async (req, res) => {
   //retrieve status category and tenant ID from body...
   const {status, id} = req.params
   //console.log('params',req.params)
   //fetch data based on status and tenant ID
   const request = await RequestModel.find({tenantId: id, status:status}).populate('tenantId', 'name email').populate('listingId', 'title images rent');
   //throw error if there is an error...
  // console.log('req', request)
   if (!request) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Requests not found');
   }
   res.status(StatusCodes.OK).json({ success: true, data: request });

});

//Get all requests based on status related to landlord ID
export const getRequestsByLandlordID = catchAsync(async (req, res) => {
   //retrieve status category and landlord ID from body...
   const {status, id} = req.params
   //fetch data based on status and landlord ID
   const request = await RequestModel.find({landlordId: id, status:status}).populate('landlordId', 'name email').populate('listingId', 'title images');
   console.log('req land', status, id)
   if (!request) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Requests not found');
   }
   res.status(StatusCodes.OK).json({ success: true, data: request });

});



// APPROVE a request
export const approveRequest = catchAsync(async (req: Request, res: Response) => {
   //console.log('rq', req.params)
   const request = await RequestModel.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', approvedDate: new Date() },
      { new: true, runValidators: true }
   );

   if (!request) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Request not found');
   }

   res.status(StatusCodes.OK).json({ success: true, data: request, message: 'Request approved' });
});
// UPDATE a request
export const updateRequest = catchAsync(async (req: Request, res: Response) => {
   //console.log('rq', req.params)
   const request = await RequestModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
   );

   if (!request) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Request not found');
   }

   res.status(StatusCodes.OK).json({ success: true, data: request, message: 'Request approved' });
});

// COMPLETE a request (CHECKOUT)
export const completeRequest = catchAsync(async (req: Request, res: Response) => {
   const request = await RequestModel.findByIdAndUpdate(
      req.params.id,
      { status: 'completed', checkoutDate: new Date(), transactionId: req.body.transactionId },
      { new: true, runValidators: true }
   );

   if (!request) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Request not found');
   }

   res.status(StatusCodes.OK).json({ success: true, data: request, message: 'Request completed successfully' });
});

// DELETE a request
export const deleteRequest = catchAsync(async (req: Request, res: Response) => {
   const request = await RequestModel.findByIdAndDelete(req.params.id);
   if (!request) {
      throw new AppError(StatusCodes.NOT_FOUND, 'Request not found');
   }

   res.status(StatusCodes.OK).json({ success: true, message: 'Request deleted' });
});

// Export controller
export const RequestController = {
   createRequest,
   getRequests,
   getRequestById,

   getRequestsByTenantID,
   getRequestsByLandlordID,

   updateRequest,
   approveRequest,
   completeRequest,
   deleteRequest,
};
