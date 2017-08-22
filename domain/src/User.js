const crypto = require('crypto');

function readyToSave(user) {
    let res = {
        email: user.email,
        name: user.name,
        created: Date.now(),
    };
    res.salt = crypto.randomBytes(128).toString('base64');
    res.passwordHash = generateHash(user.password, res.salt);
    return res;
}

function comparePasswords(user, password) {
    if(!user.passwordHash || !password) return false;
    return generateHash(password, user.salt) === user.passwordHash;
}

function generateHash(password, salt) {
    return crypto.pbkdf2Sync(password, salt, 1, 128, 'sha1').toString('hex');
  }

module.exports = {
    readyToSave,
    comparePasswords
};