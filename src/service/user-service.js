import { User, Task } from '../models/index.js';
import jwt from 'jsonwebtoken';
import config from '../config/config.js';

class UserService {
    static async registerUser(userData) {
        try {
            // Check if user already exists
            const existingUser = await User.findOne({
                where: {
                    email: userData.email
                }
            });
            
            if (existingUser) {
                throw new Error('User with this email already exists');
            }

            const existingUsername = await User.findOne({
                where: {
                    username: userData.username
                }
            });
            
            if (existingUsername) {
                throw new Error('Username already taken');
            }

            // Create new user
            const newUser = await User.create(userData);
            return newUser.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async loginUser(credentials) {
        try {
            const { email, password } = credentials;
            
            // Find user by email
            const user = await User.findOne({
                where: { email }
            });
            
            if (!user) {
                throw new Error('Invalid credentials');
            }

            // Verify password
            const isValidPassword = await user.comparePassword(password);
            if (!isValidPassword) {
                throw new Error('Invalid credentials');
            }

            // Generate JWT token
            const token = jwt.sign(
                { userId: user.id, email: user.email },
                config.jwt.secret,
                { expiresIn: config.jwt.expiresIn }
            );

            return {
                user: user.toJSON(),
                token
            };
        } catch (error) {
            throw error;
        }
    }

    static async getUserById(userId) {
        try {
            const user = await User.findByPk(userId);
            if (!user) {
                throw new Error('User not found');
            }
            return user.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async getUserWithTasks(userId) {
        try {
            const user = await User.findByPk(userId, {
                include: [{
                    model: Task,
                    as: 'tasks',
                    attributes: ['id', 'title', 'description', 'status', 'priority', 'created_at', 'updated_at']
                }]
            });
            
            if (!user) {
                throw new Error('User not found');
            }
            
            return user.toJSON();
        } catch (error) {
            throw error;
        }
    }
}

export default UserService; 