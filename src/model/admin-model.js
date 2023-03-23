import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import config from '../config/config.js';

const AdminSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true
    }
);

// For Login
AdminSchema.methods.comparepassword = async function (candidatepassword) {
    const admin = this;
    return bcrypt.compare(candidatepassword, admin.password).catch(() => false);
};

AdminSchema.pre('save', async function (next) {
    const admin = this;

    //only hash the password if it's new or being modified
    if (!admin.isModified('password')) {
        return next();
    }
    //add Random additonal date
    const salt = await bcrypt.genSalt(config.salt.number);
    const hash = bcrypt.hashSync(admin.password, salt);
    //Replace the password with hash
    admin.password = hash;

    return next();
});

const Admin = mongoose.model('Admin', AdminSchema);

export default Admin;