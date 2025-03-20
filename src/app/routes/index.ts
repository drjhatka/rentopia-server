import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { RentalRoutes } from '../modules/listings/rental.routes';
import { RequestRoutes } from '../modules/rentalRequest/request.routes';
import { PaymentRoutes } from '../modules/payment/payment.routes';
//import { OrderRoutes } from '../modules/order/order.routes';
const router = Router();

const moduleRoutes = [
   {
      path: '/user',
      route: UserRoutes,
   },
   {
      path: '/auth',
      route: AuthRoutes,
   },
   {
      path: '/rental',
      route: RentalRoutes,
   },
   {
      path: '/request',
      route: RequestRoutes,
   },
   {
      path: '/payment',
      route: PaymentRoutes,
   },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
