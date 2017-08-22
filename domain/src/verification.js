const klad = require('./main');

async function checkSignUp(user) {
    let errors = [];
    let verifiedEmail = await checkEmail(user.email);
    if (verifiedEmail.isVerified === false) {
        verifiedEmail.errors.forEach(error => {
            errors.push({
                id: error.id,
                properties: error.properties
            });
        });
    }
    let isVerified = !errors.length;
    if (!isVerified)
        user = undefined;
    return {
        user,
        isVerified,
        errors
    };
}

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
    checkSignUp
};