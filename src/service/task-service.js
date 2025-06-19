import { Task, User } from '../models/index.js';
import { Op } from 'sequelize';
import { sequelize } from '../config/database.js';

class TaskService {
    static async createTask(taskData) {
        try {
            const task = await Task.create(taskData);
            return task.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async getTaskById(taskId, userId) {
        try {
            const task = await Task.findOne({
                where: {
                    id: taskId,
                    userId: userId
                },
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'email']
                }]
            });

            if (!task) {
                throw new Error('Task not found');
            }

            return task.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async getUserTasks(userId, options = {}) {
        try {
            const { status, priority, archived, tags, search } = options;
            
            const whereClause = { userId };
            
            if (status) whereClause.status = status;
            if (priority) whereClause.priority = priority;
            if (archived !== undefined) whereClause.isArchived = archived;
            if (tags && tags.length > 0) {
                whereClause.tags = {
                    [Op.overlap]: tags
                };
            }
            if (search) {
                whereClause[Op.or] = [
                    { title: { [Op.iLike]: `%${search}%` } },
                    { description: { [Op.iLike]: `%${search}%` } }
                ];
            }

            const tasks = await Task.findAll({
                where: whereClause,
                order: [['created_at', 'DESC']],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'email']
                }]
            });

            return tasks.map(task => task.toJSON());
        } catch (error) {
            throw error;
        }
    }

    static async updateTask(taskId, updateData, userId) {
        try {
            // First check if task exists and belongs to user
            const existingTask = await Task.findOne({
                where: {
                    id: taskId,
                    userId: userId
                }
            });

            if (!existingTask) {
                throw new Error('Task not found');
            }

            const updatedTask = await existingTask.update(updateData);
            return updatedTask.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async deleteTask(taskId, userId) {
        try {
            // First check if task exists and belongs to user
            const existingTask = await Task.findOne({
                where: {
                    id: taskId,
                    userId: userId
                }
            });

            if (!existingTask) {
                throw new Error('Task not found');
            }

            await existingTask.destroy();
            return { deleted: true };
        } catch (error) {
            throw error;
        }
    }

    static async getAllTasks() {
        try {
            const tasks = await Task.findAll({
                order: [['created_at', 'DESC']],
                include: [{
                    model: User,
                    as: 'user',
                    attributes: ['id', 'username', 'email']
                }]
            });

            return tasks.map(task => task.toJSON());
        } catch (error) {
            throw error;
        }
    }

    static async getTasksByStatus(status, userId) {
        try {
            const tasks = await Task.findAll({
                where: {
                    status,
                    userId
                },
                order: [['created_at', 'DESC']]
            });

            return tasks.map(task => task.toJSON());
        } catch (error) {
            throw error;
        }
    }

    static async getTasksByPriority(priority, userId) {
        try {
            const tasks = await Task.findAll({
                where: {
                    priority,
                    userId
                },
                order: [['created_at', 'DESC']]
            });

            return tasks.map(task => task.toJSON());
        } catch (error) {
            throw error;
        }
    }

    // New PostgreSQL-specific methods
    static async getTasksByTags(tags, userId) {
        try {
            const tasks = await Task.findByTags(tags, userId);
            return tasks.map(task => task.toJSON());
        } catch (error) {
            throw error;
        }
    }

    static async getOverdueTasks(userId) {
        try {
            const tasks = await Task.findOverdue(userId);
            return tasks.map(task => task.toJSON());
        } catch (error) {
            throw error;
        }
    }

    static async getTasksByDueDate(userId, startDate, endDate) {
        try {
            const tasks = await Task.findAll({
                where: {
                    userId,
                    dueDate: {
                        [Op.between]: [startDate, endDate]
                    }
                },
                order: [['due_date', 'ASC']]
            });

            return tasks.map(task => task.toJSON());
        } catch (error) {
            throw error;
        }
    }

    static async archiveTask(taskId, userId) {
        try {
            const task = await Task.findOne({
                where: {
                    id: taskId,
                    userId: userId
                }
            });

            if (!task) {
                throw new Error('Task not found');
            }

            await task.archive();
            return task.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async unarchiveTask(taskId, userId) {
        try {
            const task = await Task.findOne({
                where: {
                    id: taskId,
                    userId: userId
                }
            });

            if (!task) {
                throw new Error('Task not found');
            }

            await task.unarchive();
            return task.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async addTagsToTask(taskId, tags, userId) {
        try {
            const task = await Task.findOne({
                where: {
                    id: taskId,
                    userId: userId
                }
            });

            if (!task) {
                throw new Error('Task not found');
            }

            await task.addTags(tags);
            return task.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async removeTagsFromTask(taskId, tags, userId) {
        try {
            const task = await Task.findOne({
                where: {
                    id: taskId,
                    userId: userId
                }
            });

            if (!task) {
                throw new Error('Task not found');
            }

            await task.removeTags(tags);
            return task.toJSON();
        } catch (error) {
            throw error;
        }
    }

    static async getTaskStatistics(userId) {
        try {
            const stats = await Task.findAll({
                where: { userId },
                attributes: [
                    'status',
                    'priority',
                    [sequelize.fn('COUNT', sequelize.col('id')), 'count']
                ],
                group: ['status', 'priority']
            });

            return stats;
        } catch (error) {
            throw error;
        }
    }
}

export default TaskService; 