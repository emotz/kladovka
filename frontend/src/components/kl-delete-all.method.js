import API from 'api.json';
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

remote.deleteAll = function (component) {
    component.$http.delete(API.ITEMS).then(response => {
        component.$emit('deleteAll');
    }).catch(err => toastr.error(component.$t('errors.default')));
};

local.deleteAll = function (component) {
    for (let id in localStorage) {
        if (id === 'user' || id === 'token') continue;
        localStorage.removeItem(id);
    }
    component.$emit('deleteAll');
};