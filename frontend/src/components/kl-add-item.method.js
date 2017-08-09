import API from 'api.json';
import { clone, guid12bytes } from 'domain/utility';
import { checkItem } from 'domain/validation';
import { makeValidationError } from 'domain/errors';
import { renderValidationError } from '../services/render';

export let addItem = { remote: {}, local: {} };

addItem.remote.addItem = function (component) {
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

addItem.local.addItem = function (component) {
    let item = clone(component.item);
    let validationResult = checkItem(item);
    if (validationResult.isValid) {
        let _id = guid12bytes();
        item._id = _id;
        localStorage.setItem(_id, JSON.stringify(item));
        component.$emit('addItem', item);
    } else {
        let res = makeValidationError(validationResult.errors);
        let renderedErrors = renderValidationError(res.errors);
        renderedErrors.forEach(error => toastr.error(component.$t('errors.' + error.id, error.props)));
    }
};