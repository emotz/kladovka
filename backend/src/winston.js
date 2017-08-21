const fs = require('fs');

if (!fs.existsSync('../../logs'))
    fs.mkdirSync('../../logs');

const winston = require('winston');
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({
            label: 'SERVER',
            showLevel: false,
        }),
        new (winston.transports.File)({ filename: '../../logs/server.log' })
    ]
});

module.exports = logger;