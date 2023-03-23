import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config/config.js';

const DoctorSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true },
        specializaion: { type: String, required: true},
    },
    {
        timestamps: true
    }
);

const Doctor = mongoose.model('Doctor', DoctorSchema);

export default Doctor;