import { object, string } from 'yup';

export const createDoctorSchema = object({
    body: object({
        email: string().email('Must be valid email').required('Email is rquired'),
        firstName: string().required('First Name is required'),
        lastName: string().required('Last Name is required'),
        gender: string().required('Gender is required'),
        specializaion: string().required('Specialization is required'),
    })
});

export const doctorTimingSchema = object({
    body: object({
        timing: object().shape({
            timeSlot: string().required('time slot is required'),
            value: string().required('value is required'),
        })
    })
});



// export const getById = object({
//     params: object({
//         id: mongoose.Types.ObjectId,
//     })
// });