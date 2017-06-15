const validation = require('./validation');

const ErrorCodes = {
    Validation: 1
};

function getErrors(item){
    let res = null;
    let errors = validation(item);
    if(errors.length)
        res = {
            code: ErrorCodes.Validation, 
            errors
        };
    return res;
}

module.exports = getErrors;