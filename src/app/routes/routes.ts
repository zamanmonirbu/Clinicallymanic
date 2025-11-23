import { Router } from 'express';
import { userRoutes } from '../modules/user/user.routes';
import { authRoutes } from '../modules/auth/auth.routes';
import {newsletterRoutes} from '../modules/newsletter/newsletter.route';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/newsletter',
    route: newsletterRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
