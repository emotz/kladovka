const klad = require('./main');

async function checkEmail(email) {
    let errors = [];
    let res = await klad.getByPropFromKladovka('users', 'email', email);
    if (res !== null) {
        errors.push({
            id: "emailAlreadyExists",
            properties: ["email"]
        });
    }
    let isVerified = !errors.length;
    if (!isVerified)
        email = undefined;
    return {
        email,
        isVerified,
        errors
    };
}

module.exports = {
    checkEmail
};