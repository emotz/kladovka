const fs = require('fs');
const path = require('path');

if (!fs.existsSync(path.join(__dirname, '../../logs')))
    fs.mkdirSync(path.join(__dirname, '../../logs'));

const winston = require('winston');

let serverLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            label: 'SERVER',
            showLevel: false,
        }),
        new (winston.transports.File)({ filename: path.join(__dirname, '../../logs', "server.log") })
    ]
});

let databaseLogger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            label: 'DATABASE',
            showLevel: false,
        }),
        new (winston.transports.File)({ filename: path.join(__dirname, '../../logs', "database.log") })
    ]
});

module.exports = {
    serverLogger,
    databaseLogger
};
