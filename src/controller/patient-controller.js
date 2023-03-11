// import { omit } from 'lodash';
import { create } from '../service/patient-service.js';

export async function createPatient(req, res) {
    try {
        const patient = await create(req.body);
        // return res.send(omit(patient.toJSON(), 'password'));
        return res.send(patient);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}