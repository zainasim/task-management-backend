import ckey from 'ckey';

const DB_HOST = ckey.DB_HOST || 'localhost';
const DB_PORT = ckey.DB_PORT || 5432;
const DB_NAME = ckey.DB_NAME || 'task_management';
const DB_USER = ckey.DB_USER || 'postgres';
const DB_PASSWORD = ckey.DB_PASSWORD || '';
const SERVER_PORT = ckey.SERVER_PORT || 3000;
const JWT_SECRET = ckey.JWT_SECRET || 'your-secret-key';

const config = {
    server: {
        port: SERVER_PORT
    },
    database: {
        host: DB_HOST,
        port: DB_PORT,
        name: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        dialect: 'postgres',
        logging: false,
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        dialectOptions: {
            ssl: process.env.NODE_ENV === 'production' ? {
                require: true,
                rejectUnauthorized: false
            } : false
        }
    },
    salt: {
        number: 10
    },
    jwt: {
        secret: JWT_SECRET,
        expiresIn: '24h'
    }
};

export default config;
