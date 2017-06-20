const ErrorCodes = {
    Validation: 1
};

function makeValidationError(errors) {
    return {
        code: ErrorCodes.Validation,
        errors
    };
}

module.exports = {
    makeValidationError
};