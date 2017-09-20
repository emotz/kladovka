import API from 'api.json';
import urlJoin from 'url-join';
import { createCallMethod } from 'domain/utility';
import { isAuthenticated } from '../services/auth';

let local = {},
    remote = {};

remote.mounted = function (component) {
    component.$http.get(API.ITEMS).then(response => {
        for (let i in response.body) {
            let item = response.body[i];
            component.addItem(item);
        }
    }).catch(err => toastr.error(component.$t('errors.default')));
};

local.mounted = function (component) {
    for (let id in localStorage) {
        if (id === 'user' || id === 'token' || id === 'char') continue;
        let item = localStorage.getItem(id);
        component.addItem(JSON.parse(item));
    }
};

remote.deleteItem = function (component, id, index) {
    component.$http.delete(urlJoin(API.ITEMS, id)).then(response => {
        component.items.splice(index, 1);
    }).catch(err => toastr.error(component.$t('errors.default')));
};

local.deleteItem = function (component, id, index) {
    localStorage.removeItem(id);
    component.items.splice(index, 1);
};

remote.charAndItems = async function (component, char) {
    localStorage.removeItem('char');
    component.$store.setChar(char);
    if (component.items.length) {
        let items = [];
        for (let id in localStorage) {
            if (id === 'user' || id === 'token') continue;
            let item = localStorage.getItem(id);
            items.push(JSON.parse(item));
        }
        await component.$http.post(API["ITEMS-COLLECTION"], items);
        for (let id in localStorage) {
            if (id === 'user' || id === 'token') continue;
            localStorage.removeItem(id);
        }
        component.items = [];
    }
    remote.mounted(component);
    component.$store.setSignIn(false);
};

export const callMethod = createCallMethod(remote, local, () => isAuthenticated());

