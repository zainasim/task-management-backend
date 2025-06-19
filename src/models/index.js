import User from './User.js';
import Task from './Task.js';

// Define associations
User.hasMany(Task, {
    foreignKey: 'userId',
    as: 'tasks',
    onDelete: 'CASCADE'
});

Task.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

export {
    User,
    Task
}; 