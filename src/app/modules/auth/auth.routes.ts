import { Router } from 'express';
import { AuthController } from './auth.controller';
import auth from '../../middleware/auth';
import { IUserRole } from '../user/user.constant';

const router = Router();

router.post('/login', AuthController.loginUser);

// router.post('/refresh-token',
//    // validateRequest(AuthValidation.refreshTokenZodSchema),
//    AuthController.refreshToken
// );

router.post('/change-password', auth(IUserRole.ADMIN, IUserRole.LANDLORD, IUserRole.TENANT),
   AuthController.changePassword
);

router.post('/forgot-password', AuthController.forgotPassword);
router.post('/reset-password', AuthController.resetPassword);

export const AuthRoutes = router;
