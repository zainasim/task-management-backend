import { create, validatePassword, createDoctor } from "../service/admin-service.js";
import { createAccessToken } from "../service/session-service.js";

export async function createAdmin(req, res) {
    try {
        const admin = await create(req.body);
        // return res.send(omit(patient.toJSON(), 'password'));
        return res.send(admin);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}

export async function adminLogIn(req, res) {
    //validate email and password
    const admin = await validatePassword(req.body);
    if (!admin) {
        return res.status(401).send('Invalid Credentials');
    }

    // //create Access Token
    const accessToken = createAccessToken(admin);

    return res.send({ accessToken });
}

export async function createDoctorHandler(req, res) {
    try {
        const admin = await createDoctor(req.body);
        return res.send(admin);
    } catch (error) {
        return res.status(409).send(error.message);
    }
}