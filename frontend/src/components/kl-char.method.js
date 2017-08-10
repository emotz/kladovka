import API from 'api.json';
import urlJoin from 'url-join';
import { clone, guid12bytes } from 'domain/utility';
import { checkChar } from 'domain/validation';
import { makeValidationError } from 'domain/errors';
import { renderValidationError } from '../services/render';

export let char = { remote: {}, local: {} };

char.remote.replaceChar = function (component) {
    let char = clone(component.char);
    if (component._id === undefined) {
        component.$http.post(API.CHARS, char).then(response => {
            component._id = response.body.added_id;
            component.$store.setChar(char);
        }).catch(err => {
            if (err.status === 400 && err.body.code === 1) {
                let renderedErrors = renderValidationError(err.body.errors);
                renderedErrors.forEach(error => toastr.error(component.$t('errors.' + error.id, error.props)));
            } else
                toastr.error(component.$t('errors.default'));
        });
    } else {
        component.$http.put(urlJoin(API.CHARS, component._id), char).then(response => {
            component.$store.setChar(char);
        }).catch(err => {
            if (err.status === 400 && err.body.code === 1) {
                let renderedErrors = renderValidationError(err.body.errors);
                renderedErrors.forEach(error => toastr.error(component.$t('errors.' + error.id, error.props)));
            } else if (err.status === 404)
                toastr.error(component.$t('errors.notFound'));
            else
                toastr.error(component.$t('errors.default'));
        });
    }
};

char.local.replaceChar = function (component) {
    let char = clone(component.char);
    let validationResult = checkChar(char);
    if (validationResult.isValid) {
        let _id = guid12bytes();
        component._id = _id;
        localStorage.setItem('char', char);
        component.$store.setChar(char);
    } else {
        let res = makeValidationError(validationResult.errors);
        let renderedErrors = renderValidationError(res.errors);
        renderedErrors.forEach(error => toastr.error(component.$t('errors.' + error.id, error.props)));
    }
};