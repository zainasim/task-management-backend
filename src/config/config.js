import ckey from 'ckey';

const MONGO_URL = ckey.MONGO_URL;

const SERVER_PORT = ckey.SERVER_PORT;

const config = {
    server: {
        port: SERVER_PORT
    },
    user: {
        GMAIL_USER: 'zainasim@gmail.com',
        GMAIL_PASSWORD: 'Google@222'
    },
    salt: {
        number: 10
    },
    mongo: {
        url: MONGO_URL
    },
    token: {
        accessTokenTtl: '1m',
        refreashTokenTtl: '1y'
    },
    key: {
        privateKey: 'secret',
    }
};

export default config;
