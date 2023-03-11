import express from 'express';
import { createPatient } from '../controller/patient-controller.js';

const router = express.Router();

//To Rrgister patient
router.post('/create', createPatient);

export default router;