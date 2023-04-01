import express from 'express';
import validateRequest from '../middleware/validateRequest.js';
import { createDoctorHandler, updateDoctorTimeSlotHandler, getDoctorByIdHandler, getAllDoctorHandler, getDoctorByTypeHandler } from '../controller/doctor-controller.js';
import { createDoctorSchema, doctorTimingSchema, getByType } from '../schema/doctor-schema.js'

const router = express.Router();

//To create Doctor
router.post('/createDoctor', validateRequest(createDoctorSchema), createDoctorHandler);

router.patch('/updateTimeSlot/:id', validateRequest(doctorTimingSchema), updateDoctorTimeSlotHandler);

router.get('/getById/:id', getDoctorByIdHandler);

router.get('/getAll', getAllDoctorHandler);

router.get('/getByType/', validateRequest(getByType), getDoctorByTypeHandler);

export default router;
