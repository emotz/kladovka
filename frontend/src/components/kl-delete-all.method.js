import API from 'api.json';
import { createCallMethod } from 'domain/utility';
import { isAuthenticated } from '../services/auth';

let local = {},
    remote = {};

remote.deleteAll = function (component) {
    component.$http.delete(API.ITEMS).then(response => {
        component.$emit('deleteAll');
    }).catch(err => toastr.error(component.$t('errors.default')));
};

local.deleteAll = function (component) {
    console.log("component", component);
    for (let id in localStorage) {
        if (id === 'user' || id === 'token') continue;
        localStorage.removeItem(id);
    }
    component.$emit('deleteAll');
};

export const callMethod = createCallMethod(remote, local, () => isAuthenticated());
