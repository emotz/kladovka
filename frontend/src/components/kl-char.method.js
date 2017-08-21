import API from 'api.json';
import urlJoin from 'url-join';
import { checkChar } from 'domain/validation';
import { makeValidationError } from 'domain/errors';
import { translateError } from '../services/render';
import { isAuthenticated } from '../services/auth';

export function callMethod(component, cb) {
    let args = [];
    for (let id in arguments) {
        if (id == 1) continue;
        args.push(arguments[id]);
    }
    if (isAuthenticated())
        remote[cb].apply(undefined, args);
    else
        local[cb].apply(undefined, args);
}

let local = {},
    remote = {};

remote.replaceChar = function (component) {
    let char = component.char;
    let validationResult = checkChar(char);
    if (validationResult.isValid) {
        if (char._id === undefined) {
            component.$http.post(API.CHARS, char)
                .then(response => {
                    char._id = response.body.added_id;
                    component.$store.setChar(char);
                })
                .catch(err => {
                    if (err.status === 400 && err.body.code === 1) {
                        err.body.errors.forEach(error =>
                            toastr.error(translateError(this, error)));
                    } else if (err.status === 404)
                        toastr.error(this.$t('errors.notFound'));
                    else
                        toastr.error(this.$t('errors.default'));
                });
        } else {
            component.$http.put(urlJoin(API.CHARS, char._id), char)
                .then(response => {
                    component.$store.setChar(char);
                })
                .catch(err => {
                    if (err.status === 400 && err.body.code === 1) {
                        err.body.errors.forEach(error =>
                            toastr.error(translateError(this, error)));
                    } else if (err.status === 404)
                        toastr.error(this.$t('errors.notFound'));
                    else
                        toastr.error(this.$t('errors.default'));
                });
        }
    } else {
        let res = makeValidationError(validationResult.errors);
        res.errors.forEach(error =>
            toastr.error(translateError(this, error)));
    }
};

local.replaceChar = function (component) {
    let char = component.char;
    let validationResult = checkChar(char);
    if (validationResult.isValid) {
        localStorage.setItem('char', JSON.stringify(char));
        component.$store.setChar(char);
    } else {
        let res = makeValidationError(validationResult.errors);
        res.errors.forEach(error =>
            toastr.error(translateError(this, error)));
    }
};


remote.mounted = function (component) {
    component.$http.get(API.CHARS).then(response => {
        component.$store.setChar(response.body);
    }).catch(err => toastr.error(component.$t('errors.default')));
};

local.mounted = function (component) {
    let char = localStorage.getItem('char');
    if (char != null)
        component.$store.setChar(JSON.parse(char));
};