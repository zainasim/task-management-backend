import Patient from "../model/patient-model.js";


export async function create(input) {
    try {
        return await Patient.create(input);
    } catch (error) {
        throw new Error(error);
    }
}