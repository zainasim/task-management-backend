import { Sequelize } from 'sequelize';
import config from './config.js';
import Logging from '../library/Logging.js';

const sequelize = new Sequelize(
    config.database.name,
    config.database.username,
    config.database.password,
    {
        host: config.database.host,
        port: config.database.port,
        dialect: config.database.dialect,
        logging: config.database.logging ? Logging.info : false,
        pool: config.database.pool,
        define: {
            timestamps: true,
            underscored: true,
            freezeTableName: true
        }
    }
);

const dbConnection = async () => {
    try {
        await sequelize.authenticate();
        Logging.info('Connected to PostgreSQL Database....');
        
        // Sync all models with database
        await sequelize.sync({ alter: true });
        Logging.info('Database models synchronized');
        
        return sequelize;
    } catch (error) {
        Logging.error('Unable to connect to the database:', error.message);
        throw error;
    }
};

export { sequelize, dbConnection }; 