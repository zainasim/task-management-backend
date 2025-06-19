import express from 'express';
import userRoutes from './user-routes.js';
import taskRoutes from './task-routes.js';

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Task Management API is running',
        timestamp: new Date().toISOString()
    });
});

// API routes
router.use('/users', userRoutes);
router.use('/tasks', taskRoutes);

export default router;
