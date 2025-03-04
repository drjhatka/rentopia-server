import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.routes';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { OrderRoutes } from '../modules/order/order.routes';
import { SSLRoutes } from '../modules/sslcommerz/sslcommerz.routes';

import { ReviewRoutes } from '../modules/review/review.routes';
import { MetaRoutes } from '../modules/meta/meta.route';
import { RentalRoutes } from '../modules/listings/rental.routes';
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
