import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import {LandlordServices} from '../landlord/landlord.service';
import { IImageFile } from '../../interface/IImageFile';
import { IJwtPayload } from '../auth/auth.interface';
import config from '../../config';

const createLandlord = catchAsync(async (req: Request, res: Response) => {
  const result = await LandlordServices.createLandlord(req.body);
  
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Landlord profile created successfully',
    data: result,
  });
});

const getLandlordProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await LandlordServices.getLandlordProfile(id);
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Landlord profile retrieved successfully',
    data: result,
  });
});

const getLandlordByUserId = catchAsync(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const result = await LandlordServices.getLandlordByUserId(userId);
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Landlord profile retrieved successfully',
    data: result,
  });
});

const updateLandlordProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await LandlordServices.updateLandlordProfile(id, req.body);
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Landlord profile updated successfully',
    data: result,
  });
});

const uploadVerificationDocument = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = req.file as IImageFile;
  
  const result = await LandlordServices.uploadVerificationDocument(
    id, 
    req.body.documentType, 
    file
  );

  // res.cookie('refreshToken', result.refreshToken, {
  //   secure: config.NODE_ENV === 'production',
  //   httpOnly: true,
  //   sameSite: 'none',
  //   maxAge: 1000 * 60 * 60 * 24 * 365,
  // });

  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: 'Verification document uploaded successfully',
    data: {
      document: result.document,
      //accessToken: result.accessToken,
    },
  });
});

const updateDocumentStatus = catchAsync(async (req: Request, res: Response) => {
  const { id, docId } = req.params;
  const result = await LandlordServices.updateDocumentStatus(
    id, 
    docId, 
    req.body
  );
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Document status updated successfully',
    data: result,
  });
});

const updateBankDetails = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await LandlordServices.updateBankDetails(id, req.body);
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Bank details updated successfully',
    data: result,
  });
});

const deleteLandlordProfile = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await LandlordServices.deleteLandlordProfile(id);
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Landlord profile deleted successfully',
    data: result,
  });
});

const getMyLandlordProfile = catchAsync(async (req: Request, res: Response) => {
  const result = await LandlordServices.getLandlordByUserId(
    (req.user as IJwtPayload).userId
  );
  
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'Landlord profile retrieved successfully',
    data: result,
  });
});

export const LandlordController = {
  createLandlord,
  getLandlordProfile,
  getLandlordByUserId,
  updateLandlordProfile,
  uploadVerificationDocument,
  updateDocumentStatus,
  updateBankDetails,
  deleteLandlordProfile,
  getMyLandlordProfile,
};