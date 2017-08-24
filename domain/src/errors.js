const ERROR_CODES = {
    VALIDATION: 1,
    VERIFICATION: 2,
    AUTHENTICATION: 3,
    AUTHORIZATION: 4
};

function makeValidationError(errors) {
    return {
        code: ERROR_CODES.VALIDATION,
        errors
    };
}

function makeVerificationError(errors) {
    return {
        code: ERROR_CODES.VERIFICATION,
        errors
    };
}

function makeAuthenticationError(errors) {
    return {
        code: ERROR_CODES.AUTHENTICATION,
        errors
    };
}

function makeAuthorizationError(errors) {
    return {
        code: ERROR_CODES.AUTHORIZATION,
        errors
    };
}

module.exports = {
    ERROR_CODES,
    makeValidationError,
    makeVerificationError,
    makeAuthenticationError,
    makeAuthorizationError
};