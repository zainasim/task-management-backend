import jwt from 'jsonwebtoken';

export async function authorizeUser(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized request' });
        }

        const decodedToken = jwt.decode(token);

        if (decodedToken.payload.user_id === req.body.userID || decodedToken.payload.user_id === req.body.likedBy || decodedToken.payload.user_email === req.body.email) {
            return next();
        }
        return res.status(401).json({ message: 'Invalid User' });
    } catch (error) {
        res.status(422).json({ error });
    }
}
