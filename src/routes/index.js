import { Router } from 'express';
import patientRoute from './patient-routes.js';

const router = Router();

const defaultRoutes = [
    {
        path: '/patient',
        route: patientRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
