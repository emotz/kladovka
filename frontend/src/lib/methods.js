import API from 'api.json';
import { clone, guid } from 'domain/utility';
import { checkItem } from 'domain/validation';
import { makeValidationError } from 'domain/errors';
import { renderValidationError } from '../lib/render';

let item = { local: {}, remote: {} };

item.remote.addItem = function (component) {
    let item = clone(component.item);
    component.$http.post(API.ITEMS, item).then(response => {
        item._id = response.body.added_id;
        component.$emit('addItem', item);
    }).catch(err => {
        if (err.status === 400 && err.body.code === 1) {
            let renderedErrors = renderValidationError(err.body.errors);
            renderedErrors.forEach(error => toastr.error(component.$t('errors.' + error.id, error.props)));
        } else
            toastr.error(component.$t('errors.default'));
    });
};
item.local.addItem = function (component) {
    let item = clone(component.item);
    let validationResult = checkItem(item);
    if (validationResult.isValid) {
        let id = guid();
        item._id = id;
        localStorage.setItem(id, item);
        component.$emit('addItem', item);
    } else {
        let res = makeValidationError(validationResult.errors);
        let renderedErrors = renderValidationError(res.errors);
        renderedErrors.forEach(error => toastr.error(component.$t('errors.' + error.id, error.props)));
    }
};

export { item };