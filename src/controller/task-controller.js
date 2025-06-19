import TaskService from '../service/task-service.js';
import Logging from '../library/Logging.js';

class TaskController {
    static async createTask(req, res) {
        try {
            const { title, description, status, priority, dueDate, tags, metadata } = req.body;
            const userId = req.user.userId;

            const taskData = {
                title,
                description: description || '',
                status: status || 'pending',
                priority: priority || 'medium',
                dueDate: dueDate || null,
                tags: tags || [],
                metadata: metadata || {},
                userId
            };

            const task = await TaskService.createTask(taskData);

            res.status(201).json({
                success: true,
                message: 'Task created successfully',
                data: task
            });
        } catch (error) {
            Logging.error('Create task error:', error.message);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getTask(req, res) {
        try {
            const taskId = req.params.id;
            const userId = req.user.userId;

            const task = await TaskService.getTaskById(taskId, userId);

            res.status(200).json({
                success: true,
                data: task
            });
        } catch (error) {
            Logging.error('Get task error:', error.message);
            res.status(404).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getUserTasks(req, res) {
        try {
            const userId = req.user.userId;
            const { status, priority, archived, tags, search } = req.query;

            const options = {};
            if (status) options.status = status;
            if (priority) options.priority = priority;
            if (archived !== undefined) options.archived = archived;
            if (tags) options.tags = tags;
            if (search) options.search = search;

            const tasks = await TaskService.getUserTasks(userId, options);

            res.status(200).json({
                success: true,
                data: tasks
            });
        } catch (error) {
            Logging.error('Get user tasks error:', error.message);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async updateTask(req, res) {
        try {
            const taskId = req.params.id;
            const userId = req.user.userId;
            const { title, description, status, priority, dueDate, tags, metadata } = req.body;

            const updateData = {
                title,
                description: description || '',
                status: status || 'pending',
                priority: priority || 'medium',
                dueDate: dueDate || null,
                tags: tags || [],
                metadata: metadata || {}
            };

            const task = await TaskService.updateTask(taskId, updateData, userId);

            res.status(200).json({
                success: true,
                message: 'Task updated successfully',
                data: task
            });
        } catch (error) {
            Logging.error('Update task error:', error.message);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async deleteTask(req, res) {
        try {
            const taskId = req.params.id;
            const userId = req.user.userId;

            const result = await TaskService.deleteTask(taskId, userId);

            res.status(200).json({
                success: true,
                message: 'Task deleted successfully',
                data: result
            });
        } catch (error) {
            Logging.error('Delete task error:', error.message);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }

    static async getAllTasks(req, res) {
        try {
            const tasks = await TaskService.getAllTasks();

            res.status(200).json({
                success: true,
                data: tasks
            });
        } catch (error) {
            Logging.error('Get all tasks error:', error.message);
            res.status(400).json({
                success: false,
                message: error.message
            });
        }
    }
}

export default TaskController; 