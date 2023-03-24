import mongoose from 'mongoose';

const DoctorSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        gender: { type: String, required: true },
        specializaion: { type: String, required: true},
        timing: {
            type: [{}],
            required: false,
            default: [
                {
                    "timeSlot": "9:00-9:30",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "9:30-10:00",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "10:00-10:30",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "10:30-11:00",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "11:00-11:30",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "11:30-12:00",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "12:00-12:30",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "12:30-1:00",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "1:00-1:30",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "1:30-2:00",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "2:00-2:30",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "2:30-3:00",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "3:00-3:30",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "3:30-4:00",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "4:00-4:30",
                    "value": "",
                    "day": "",
                },
                {
                    "timeSlot": "4:30-5:00",
                    "value": "",
                    "day": "",
                },
            ]
        },
    },
    {
        timestamps: true
    }
);

const Doctor = mongoose.model('Doctor', DoctorSchema);

export default Doctor;