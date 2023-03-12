import express from 'express';
import { createPatient, patientLogIn } from '../controller/patient-controller.js';
import validateRequest from '../middleware/validateRequest.js';
import { createPatientSchema, loginPatientSchema } from '../schema/patient-schema.js'

const router = express.Router();

//To Rrgister patient
router.post('/create', validateRequest(createPatientSchema), createPatient);

//To LogIn patient
router.post('/login', validateRequest(loginPatientSchema), patientLogIn);

export default router;