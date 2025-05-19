import express from 'express';
import { LandlordController } from './landlord.controller';
import auth from '../../middleware/auth';
import { IUserRole } from '../user/user.constant';
//import validateRequest from '../../middlewares/validateRequest';
//import { LandlordValidation } from './landlord.validation';
//import { upload } from '../../utils/fileUpload';

const router = express.Router();

// Public routes
router.post(
  '/',
  //validateRequest(LandlordValidation.createLandlordSchema),
  LandlordController.createLandlord
);

// Protected routes (require authentication)
router.use(auth());

// Landlord profile management
router.get(
  '/my-profile',
  auth(IUserRole.LANDLORD),
  LandlordController.getMyLandlordProfile
);

router.patch(
  '/my-profile',
  auth(IUserRole.LANDLORD),
  //validateRequest(LandlordValidation.updateLandlordSchema),
  LandlordController.updateLandlordProfile
);

// Verification document routes
router.post(
  '/verifications',
  auth(IUserRole.LANDLORD),
  //upload.single('document'),
  //validateRequest(LandlordValidation.uploadVerificationSchema),
  LandlordController.uploadVerificationDocument
);

// Financial routes
router.patch(
  '/bank-details',
  auth(IUserRole.LANDLORD),
  //validateRequest(LandlordValidation.bankDetailsSchema),
  LandlordController.updateBankDetails
);

// Admin-only routes
router.use(auth(IUserRole.ADMIN));

// router.get(
//   '/',
//   LandlordController.getAllLandlords
// );

router.get(
  '/:id',
  LandlordController.getLandlordProfile
);

router.patch(
  '/:id/verifications/:docId/status',
  //validateRequest(LandlordValidation.updateVerificationStatusSchema),
  LandlordController.updateDocumentStatus
);

router.delete(
  '/:id',
  LandlordController.deleteLandlordProfile
);

export const LandlordRoutes = router;