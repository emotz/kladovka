const ERROR_CODES = {
    VALIDATION: 1
};

function makeValidationError(errors) {
    return {
        code: ERROR_CODES.VALIDATION,
        errors
    };
}

module.exports = {
    makeValidationError
};