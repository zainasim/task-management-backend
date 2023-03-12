import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const privateKey = config.key.privateKey;

export function sign(object, options) {
    return jwt.sign(object, privateKey, options);
}
