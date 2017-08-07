import API from 'api.json';
import urlJoin from 'url-join';

export let items = { remote: {}, local: {} };

items.remote.mounted = function (component) {
    component.$http.get(API.ITEMS).then(response => {
        for (let i in response.body) {
            let item = response.body[i];
            component.addItem(item);
        }
    }).catch(err => toastr.error(component.$t('errors.default')));
};

items.local.mounted = function (component) {
    for (let id in localStorage) {
        let item = localStorage.getItem(id);
        component.addItem(JSON.parse(item));
    }
};

items.remote.deleteItem = function (component, id, index) {
    component.$http.delete(urlJoin(API.ITEMS, id)).then(response => {
        component.items.splice(index, 1);
    }).catch(err => toastr.error(component.$t('errors.default')));
};

items.local.deleteItem = function (component, id, index) {
    localStorage.removeItem(id);
    component.items.splice(index, 1);
};

items.remote.deleteAll = function (component) {
    component.$http.delete(API.ITEMS).then(response => {
        component.items = [];
    }).catch(err => toastr.error(component.$t('errors.default')));
};

items.local.deleteAll = function (component) {
    localStorage.clear();
    component.items = [];
};