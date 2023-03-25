import jwt from 'jsonwebtoken';

export async function authorizeUser(req, res, next) {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized request' });
        }

        const decodedToken = jwt.decode(token);

        if (decodedToken.payload.user_id !== req.params.id) {
            return res.status(401).json({ message: 'Invalid User' });
        }
        console.log("zain asim");
        next();
    } catch (error) {
        res.status(422).json({ error });
    }
}
