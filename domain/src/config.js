const config = require('../../config/config-default.json');

for (const key in config) {
    const envValue = process.env["KL_" + key];
    if (envValue !== undefined) {
        config[key] = envValue;
    }
}

module.exports = config;
