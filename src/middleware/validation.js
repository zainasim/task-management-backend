import * as yup from 'yup';
import Logging from '../library/Logging.js';

// Validation schemas
const userSchemas = {
    register: yup.object({
        username: yup.string()
            .min(3, 'Username must be at least 3 characters')
            .max(50, 'Username must be less than 50 characters')
            .matches(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
            .required('Username is required'),
        email: yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required')
    }),

    login: yup.object({
        email: yup.string()
            .email('Invalid email format')
            .required('Email is required'),
        password: yup.string()
            .required('Password is required')
    })
};

const taskSchemas = {
    create: yup.object({
        title: yup.string()
            .min(1, 'Title is required')
            .max(255, 'Title must be less than 255 characters')
            .required('Title is required'),
        description: yup.string()
            .max(1000, 'Description must be less than 1000 characters'),
        status: yup.string()
            .oneOf(['pending', 'in_progress', 'completed', 'cancelled'], 'Invalid status')
            .default('pending'),
    }),

    update: yup.object({
        title: yup.string()
            .min(1, 'Title is required')
            .max(255, 'Title must be less than 255 characters'),
        description: yup.string()
            .max(1000, 'Description must be less than 1000 characters'),
        status: yup.string()
            .oneOf(['pending', 'in_progress', 'completed', 'cancelled'], 'Invalid status'),
    }),
};

const querySchemas = {
    taskFilters: yup.object({
        status: yup.string()
            .oneOf(['pending', 'in_progress', 'completed', 'cancelled'], 'Invalid status'),
        search: yup.string()
            .max(100, 'Search term too long')
    }),
};

// Validation middleware factory
const validate = (schema, location = 'body') => {
    return async (req, res, next) => {
        try {
            let data;
            
            switch (location) {
                case 'body':
                    data = req.body;
                    break;
                case 'query':
                    data = req.query;
                    break;
                case 'params':
                    data = req.params;
                    break;
                default:
                    data = req.body;
            }

            // Validate data
            const validatedData = await schema.validate(data, {
                abortEarly: false,
                stripUnknown: true
            });

            // Replace original data with validated data
            switch (location) {
                case 'body':
                    req.body = validatedData;
                    break;
                case 'query':
                    req.query = validatedData;
                    break;
                case 'params':
                    req.params = validatedData;
                    break;
            }

            next();
        } catch (error) {
            Logging.error('Validation error:', error.message);
            
            if (error.name === 'ValidationError') {
                const errors = error.errors.map(err => err.message);
                return res.status(400).json({
                    success: false,
                    message: 'Validation failed',
                    errors: errors
                });
            }

            res.status(500).json({
                success: false,
                message: 'Internal validation error'
            });
        }
    };
};

// Export validation functions
export const validateUser = {
    register: validate(userSchemas.register, 'body'),
    login: validate(userSchemas.login, 'body')
};

export const validateTask = {
    create: validate(taskSchemas.create, 'body'),
    update: validate(taskSchemas.update, 'body'),
};

export const validateQuery = {
    taskFilters: validate(querySchemas.taskFilters, 'query'),
};

// Custom validation for ID parameters
export const validateId = (req, res, next) => {
    const id = parseInt(req.params.id);
    
    if (isNaN(id) || id <= 0) {
        return res.status(400).json({
            success: false,
            message: 'Invalid ID parameter'
        });
    }
    
    req.params.id = id;
    next();
}; 