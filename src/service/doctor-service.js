import Doctor from "../model/doctor-model.js";
import { ObjectId } from 'mongodb';

export async function createDoctor(input) {
    try {
        return await Doctor.create(input);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateDoctorTimeSlot(body, id) {
    try {
        const doctor = await Doctor.findById(id);
        if(!doctor) {
            throw new Error('Doctor with this id does not exist');
        }
        const filter = {
            timing: { $elemMatch: { timeSlot: body.timing.timeSlot, value: '' } }
        };

        const update = { $set: { "timing.$.value": new ObjectId(body.timing.value) } };
        const options = { new: true };
        const updatedDoctor = await Doctor.findOneAndUpdate(filter, update, options);
        if(!updatedDoctor) {
            throw new Error('This slot is already filled');
        }
        return updatedDoctor;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getDoctorById(id) {
    try {
        return await Doctor.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function getAllDoctor() {
    try {
        return await Doctor.find();
    } catch (error) {
        throw new Error(error.message);
    }
}
