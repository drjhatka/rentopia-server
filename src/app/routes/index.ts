import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { RentalRoutes } from '../modules/listings/rental.routes';
import { RequestRoutes } from '../modules/rentalRequest/request.routes';
import { OrderRoutes } from '../modules/order/order.routes';
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

   // {
   //    path: '/order',
   //    route: OrderRoutes,
   // },
   // {
   //    path: '/ssl',
   //    route: SSLRoutes,
   // },
   // {
   //    path: '/review',
   //    route: ReviewRoutes,
   // },
   // {
   //    path: '/meta',
   //    route: MetaRoutes,
   // },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
