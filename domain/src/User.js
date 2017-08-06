const crypto = require('crypto');

function readyToSave(user) {
    let res = {
        email: user.email,
        name: user.name,
        created: Date.now(),
        token: Date.now()
    };
    res.salt = crypto.randomBytes(128).toString('base64');
    res.passwordHash = crypto.pbkdf2Sync(user.password, res.salt, 1, 128, 'sha1').toString('hex');
    return res;
}

function comparePasswords(user, password) {
    if(!user.passwordHash || !password) return false;
    return crypto.pbkdf2Sync(password, user.salt, 1, 128, 'sha1').toString('hex') === user.passwordHash;
}

module.exports = {
    readyToSave,
    comparePasswords
};