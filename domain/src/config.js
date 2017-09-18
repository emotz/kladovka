const config = require('../../config/config-default.json');

for (const key in config) {
    const envValue = process.env["KL_" + key];
    if (envValue !== undefined)
        config[key] = parseEnvValue(key, envValue);
}

// > parseEnvValue("DB", "mongo")
// "mongo"
// > parseEnvValue("TESTS_DB", "mongo")
// ["mongo"]
// > parseEnvValue("TESTS_DB", "mongo,memory")
// ["mongo", "memory"]
function parseEnvValue(key, value) {
    switch (key) {
        case 'TESTS_DB':
            return value.split(',');
        default:
            return value;
    }
}

module.exports = config;
