import { Types } from 'mongoose';
import { IImageFile } from '../../interface/IImageFile';
import { IDocumentType, ILandlord, IVerificationDocument } from './landlord.interface';
import LandlordModel from './landlord.model';
import { StatusCodes } from 'http-status-codes';
//import { jwtHelpers } from '../../helpers/jwtHelpers';
import config from '../../config';
import AppError from '../../errors/appError';
import { createToken } from '../auth/auth.utils';
import { IUserRole } from '../user/user.constant';

const createLandlord = async (payload: Partial<ILandlord>) => {
    //check if landlord exists...
    const existingLandlord = await LandlordModel.findOne({ userId: payload.userId });
    if (existingLandlord) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Landlord profile already exists');
    }
    return await LandlordModel.create({
        ...payload,
        verificationStatus: 'unverified',
    });
};

const getLandlordProfile = async (id: string) => {
    const result = await LandlordModel.findById(id).populate('userId');
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Landlord not found');
    }
    return result;
};

const getLandlordByUserId = async (userId: string) => {
    const result = await LandlordModel.findOne({ userId }).populate('userId');
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Landlord not found for this user');
    }
    return result;
};

const updateLandlordProfile = async (id: string, payload: Partial<ILandlord>) => {
    // Remove immutable fields
    const { userId, verificationStatus, ...updateData } = payload;

    const result = await LandlordModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true, runValidators: true }
    ).populate('userId');

    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Landlord not found');
    }
    return result;
};

const uploadVerificationDocument = async (
    landlordId: string,
    documentType: IDocumentType,
    file: IImageFile
) => {

    const document: IVerificationDocument = {
        documentType,
        documentUrl: `/uploads/verifications/${file.filename}`,
        fileType: file.mimetype,
        fileSize: file.size,
        status: 'pending',
        uploadedAt: new Date(),
    };

    const landlord = await LandlordModel.findByIdAndUpdate(
        landlordId,
        {
            $push: { verificationDocuments: document },
            verificationStatus: 'pending',
        },
        { new: true }
    );

    if (!landlord) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Landlord not found');
    }

    // // Generate new tokens if needed
    // const accessToken = createToken(
    //     { userId: landlord.userId as string, role: IUserRole.LANDLORD, name:landlord.populate('userId') },
    //     config.jwt_access_secret as string,
    //     config.jwt_access_expires_in as string
    // );

    // const refreshToken = jwtHelpers.createToken(
    //     { userId: landlord.userId, role: 'landlord' },
    //     config.jwt_refresh_secret as string,
    //     config.jwt_refresh_expires_in as string
    // );

   // return { document, accessToken, refreshToken };
    return { document };
};

const updateDocumentStatus = async (
    landlordId: string,
    docId: string,
    payload: { status: string; rejectionReason?: string }
) => {
    const update: any = {
        'verificationDocuments.$.status': payload.status,
        'verificationDocuments.$.reviewedAt': new Date(),
    };

    if (payload.rejectionReason) {
        update['verificationDocuments.$.rejectionReason'] = payload.rejectionReason;
    }

    const landlord = await LandlordModel.findOneAndUpdate(
        {
            _id: landlordId,
            'verificationDocuments._id': docId,
        },
        update,
        { new: true }
    );

    if (!landlord) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Document not found');
    }

    // Check if all documents are approved
    const allApproved = landlord?.verificationDocuments?.every(
        doc => doc.status === 'approved'
    );

    if (allApproved) {
        await LandlordModel.findByIdAndUpdate(
            landlordId,
            { verificationStatus: 'verified' }
        );
        return { verificationStatus: 'verified' };
    }

    return { verificationStatus: landlord.verificationStatus };
};

const updateBankDetails = async (landlordId: string, payload: any) => {
    const result = await LandlordModel.findByIdAndUpdate(
        landlordId,
        { bankDetails: payload },
        { new: true, runValidators: true }
    );

    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Landlord not found');
    }
    return result.bankDetails;
};

const deleteLandlordProfile = async (landlordId: string) => {
    const result = await LandlordModel.findByIdAndDelete(landlordId);
    if (!result) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Landlord not found');
    }
    return null;
};

export const LandlordServices = {
    createLandlord,
    getLandlordProfile,
    getLandlordByUserId,
    updateLandlordProfile,
    uploadVerificationDocument,
    updateDocumentStatus,
    updateBankDetails,
    deleteLandlordProfile,
};