import express from 'express';
import { createPatient } from '../controller/patient-controller.js';
import validateRequest from '../middleware/validateRequest.js';
import { createPatientSchema } from '../schema/patient-schema.js'

const router = express.Router();

//To Rrgister patient
router.post('/create', validateRequest(createPatientSchema), createPatient);

export default router;