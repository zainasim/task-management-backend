import { Router } from 'express';
import patientRoute from './patient-routes.js';
import adminRoute from './admin-routes.js';
import doctorRoute from './doctor-routes.js'

const router = Router();

const defaultRoutes = [
    {
        path: '/patient',
        route: patientRoute
    },
    {
        path: '/admin',
        route: adminRoute
    },
    {
        path: '/doctor',
        route: doctorRoute
    }
];

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
