import API from 'api.json';
import urlJoin from 'url-join';
import { checkChar } from 'domain/validation';
import { makeValidationError } from 'domain/errors';
import { renderValidationError } from '../services/render';

export let char = { remote: {}, local: {} };

char.remote.replaceChar = function (component) {
    let char = component.char;
    if (char._id === undefined) {
        component.$http.post(API.CHARS, char)
            .then(response => {
                char._id = response.body.added_id;
                component.$store.setChar(char);
            })
            .catch(err => {
                if (err.status === 400 && err.body.code === 1) {
                    let renderedErrors = renderValidationError(err.body.errors);
                    renderedErrors.forEach(error => toastr.error(component.$t('errors.' + error.id, error.props)));
                } else
                    toastr.error(component.$t('errors.default'));
            });
    } else {
        component.$http.put(urlJoin(API.CHARS, char._id), char)
            .then(response => {
                component.$store.setChar(char);
            })
            .catch(err => {
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
    let char = component.char;
    let validationResult = checkChar(char);
    if (validationResult.isValid) {
        localStorage.setItem('char', JSON.stringify(char));
        component.$store.setChar(char);
    } else {
        let res = makeValidationError(validationResult.errors);
        let renderedErrors = renderValidationError(res.errors);
        renderedErrors.forEach(error => toastr.error(component.$t('errors.' + error.id, error.props)));
    }
};

char.remote.mounted = function (component) {
    component.$http.get(API.CHARS).then(response => {
        component.$store.setChar(response.body);
    }).catch(err => toastr.error(component.$t('errors.default')));
};

char.local.mounted = function (component) {
    let char = localStorage.getItem('char');
    if (char != null)
        component.$store.setChar(JSON.parse(char));
};