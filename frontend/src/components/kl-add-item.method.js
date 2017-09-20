import API from 'api.json';
import { clone, guid12bytes, createCallMethod } from 'domain/utility';
import { checkItem } from 'domain/validation';
import { makeValidationError } from 'domain/errors';
import { translateError } from '../services/render';
import { isAuthenticated } from '../services/auth';

let local = {},
    remote = {};

remote.addItem = function (component) {
    let item = clone(component.item);
    let validationResult = checkItem(item);
    if (validationResult.isValid) {
        component.$http.post(API.ITEMS, item).then(response => {
            item._id = response.body.added_id;
            component.$emit('addItem', item);
        }).catch(err => {
            if (err.status === 400 && err.body.code === 1) {
                err.body.errors.forEach(error =>
                    toastr.error(translateError(this, error)));
            } else
                toastr.error(this.$t('errors.default'));
        });
    } else {
        let res = makeValidationError(validationResult.errors);
        res.errors.forEach(error =>
            toastr.error(translateError(this, error)));
    }
};

local.addItem = function (component) {
    let item = clone(component.item);
    let validationResult = checkItem(item);
    if (validationResult.isValid) {
        let _id = guid12bytes();
        item._id = _id;
        localStorage.setItem(_id, JSON.stringify(item));
        component.$emit('addItem', item);
    } else {
        let res = makeValidationError(validationResult.errors);
        res.errors.forEach(error =>
            toastr.error(translateError(this, error)));
    }
};

export const callMethod = createCallMethod(remote, local, () => isAuthenticated());
