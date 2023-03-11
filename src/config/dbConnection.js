import mongoose from 'mongoose';
// import config from './config';
import Logging from '../library/Logging.js';

const dbConnection = async () => {
    await mongoose
        .connect('mongodb://localhost:27017/doctor-patient-app')
        .then(() => {
            Logging.info('Connected to Database....');
        })
        .catch((error) => {
            console.error('Unable to Connect');
            console.error(error);
            process.exit(1);
        });
};

export default dbConnection;
