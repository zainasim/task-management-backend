import Admin from "../model/admin-model.js";
import Doctor from "../model/doctor-model.js";

export async function create(input) {
    try {
        return await Admin.create(input);
    } catch (error) {
        throw new Error(error.message);
    }
}

//For Login
export async function validatePassword({ email, password }) {
    try {
        const admin = await Admin.findOne({ email });
        if (!admin) {
            return false;
        }

        const isValid = await admin.comparepassword(password);
        if (!isValid) {
            return false;
        }

        return admin;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function createDoctor(input) {
    try {
        return await Doctor.create(input);
    } catch (error) {
        throw new Error(error.message);
    }
}