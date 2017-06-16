function renderValidationErrors(errors) {
    let res = [];
    errors.forEach(err => {
        if (err.id === 'mustBeLessThan') {
            let str = err.properties[0] + ' ' + err.id + ' ' + err.properties[1];
            res.push(str);
        }
        else {
            let str = err.properties.join(', ') + ' ' + err.id;
            res.push(str);
        }
    });
    return res;
}

export {
    renderValidationErrors
};