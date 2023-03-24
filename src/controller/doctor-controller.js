import { createDoctor, updateDoctorTimeSlot, getDoctorById, getAllDoctor } from "../service/doctor-service.js";

export async function createDoctorHandler(req, res) {
    try {
        const doctor = await createDoctor(req.body);
        return res.send(doctor);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}

export async function updateDoctorTimeSlotHandler(req, res) {
    try {
        const doctor = await updateDoctorTimeSlot(req.body, req.params.id);
        return res.send(doctor);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}

export async function getDoctorByIdHandler(req, res) {
    try {
        const doctor = await getDoctorById(req.params.id);
        return res.send(doctor);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}

export async function getAllDoctorHandler(req, res) {
    try {
        const doctors = await getAllDoctor();
        return res.send(doctors);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}
