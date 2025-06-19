import express from 'express';
import TaskController from '../controller/task-controller.js';
import authorize from '../middleware/authorization.js';
import { validateTask, validateQuery, validateId } from '../middleware/validation.js';

const router = express.Router();

// All task routes require authentication
router.use(authorize);

// Basic CRUD operations with validation
router.post('/', validateTask.create, TaskController.createTask);
router.get('/', validateQuery.taskFilters, TaskController.getUserTasks);
router.get('/all', TaskController.getAllTasks);
router.get('/:id', validateId, TaskController.getTask);
router.put('/:id', validateId, validateTask.update, TaskController.updateTask);
router.delete('/:id', validateId, TaskController.deleteTask);

export default router; 