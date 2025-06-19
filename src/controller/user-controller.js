import UserService from '../service/user-service.js';
import Logging from '../library/Logging.js';

class UserController {
    static async register(req, res) {
        try {
            const { username, email, password } = req.body;

            const user = await UserService.registerUser({ username, email, password });

            res.status(201).json({
                success: true,
                message: 'User registered successfully',
                data: user
            });
        } catch (error) {
            Logging.error('Registration error:', error.message);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async login(req, res) {
        try {
            const { email, password } = req.body;

            const result = await UserService.loginUser({ email, password });

            res.status(200).json({
                success: true,
                message: 'Login successful',
                data: result
            });
        } catch (error) {
            Logging.error('Login error:', error.message);
            res.status(401).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getProfile(req, res) {
        try {
            const userId = req.user.userId;
            const user = await UserService.getUserById(userId);

            res.status(200).json({
                success: true,
                data: user
            });
        } catch (error) {
            Logging.error('Get profile error:', error.message);
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default UserController; 