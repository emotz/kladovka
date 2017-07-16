const winston = require('winston');
var logger = new (winston.Logger)({
        transports: [
            new (winston.transports.Console)({
                label: 'SERVER',
                showLevel: false,
            }),
            new (winston.transports.File)({ filename:__dirname + '/../../logs/server.log' })
        ]
    });

module.exports = logger; 