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
    let isVerify = !errors.length;
    if (!isVerify)
        email = undefined;
    return {
        email,
        isVerify,
        errors
    };
}

module.exports = {
    checkEmail
};