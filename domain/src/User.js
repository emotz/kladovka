const crypto = require('crypto');

function readyToSave(user) {
    let res = {
        name: user.name,
        created: Date.now(),
        token: Date.now()
    };
    if (user.password) {
        res.salt = crypto.randomBytes(128).toString('base64');
        res.passwordHash = crypto.pbkdf2Sync(user.password, res.salt, 1, 128, 'sha1').toString('hex');
    } else {
        res.salt = undefined;
        res.passwordHash = undefined;
    }
    return res;
}

function checkPassword(user, password) {
    if (!password) return false;
    if (!user.passwordHash) return false;
    return crypto.pbkdf2Sync(password, user.salt, 1, 128, 'sha1').toString('hex') === user.passwordHash;
}

module.export = {
    readyToSave,
    checkPassword
};