import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import Logging from '../library/Logging.js';

const authorize = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({
                success: false,
                message: 'Access token is required'
            });
        }

        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        jwt.verify(token, config.jwt.secret, (err, decoded) => {
            if (err) {
                Logging.error('Token verification failed:', err.message);
                return res.status(401).json({
                    success: false,
                    message: 'Invalid or expired token'
                });
            }

            req.user = decoded;
            next();
        });
    } catch (error) {
        Logging.error('Authorization error:', error.message);
        res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};

export default authorize;
