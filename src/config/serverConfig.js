const env = process.env.NODE_ENV; // 'dev' or 'test'
// mongodb+srv://raulcvadmin:<password>@raulcvdb.bwa3z.mongodb.net/bdname?retryWrites=true&w=majority

const dev = {
    app: {
        port: process.env.APP_PORT || 3000
    },
    db: {
        host: process.env.DB_HOST + '://' || 'localhost',
        port: process.env.DB_USER_NAME + ':' + process.env.DB_PASSWORD + '@' + process.env.DB_CLUSTER + '.' + process.env.DB_PORT || 27017,
        name: '/' + process.env.DB_NAME + '?retryWrites=true&w=majority' || 'db'
    }
};

const test = {
    app: {
        port: 3000
    },
    db: {
        host: 'localhost',
        port: 27017,
        name: 'test'
    }
};

const serverConfig = {
    dev,
    test
};
module.exports = serverConfig[env];
