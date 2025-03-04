import { Router } from 'express';
import { UserController } from './user.controller';
import clientInfoParser from '../../middleware/clientInfoParser';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
import { multerUpload } from '../../config/multer.config';
import { parseBody } from '../../middleware/bodyParser';
import { IUserRole } from './user.constant';

const router = Router();

router.get('/', auth(IUserRole.ADMIN), UserController.getAllUser);

router.get('/me', auth(IUserRole.ADMIN, IUserRole.LANDLORD, IUserRole.TENANT), UserController.myProfile);

//clientInfoParser,
//validateRequest(UserValidation.userCreateValidationSchema),
router.post('/', UserController.registerUser
);
// update profile
router.patch(
   '/update-profile',
   auth(IUserRole.ADMIN, IUserRole.LANDLORD, IUserRole.TENANT),
   multerUpload.single('profilePhoto'),
   parseBody,
   //validateRequest(UserValidation.customerInfoValidationSchema),
   UserController.updateProfile
);

router.patch(
   '/:id/status',
   auth(IUserRole.ADMIN),
   UserController.updateUserStatus
);

export const UserRoutes = router;