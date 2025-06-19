import express from 'express';
import { dbConnection } from './config/database.js';
import bodyParser from 'body-parser';
import Logging from './library/Logging.js';
import routes from './routes/index.js';
import config from './config/config.js';
import cors from 'cors';

// Import models to ensure they are registered with Sequelize
import './models/index.js';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = config.server.port;

dbConnection()
    .then(() => {
        startServer();
    })
    .catch((error) => {
        Logging.error('Failed to connect to database:', error);
        process.exit(1);
    });

const startServer = () => {
    app.use('/api/v1', routes);

    app.listen(port, () => {
        Logging.info(`Server is listening on port ${port}`);
    });
};
