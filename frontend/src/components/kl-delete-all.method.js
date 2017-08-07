import API from 'api.json';

export let deleteAll = { remote: {}, local: {} };

deleteAll.remote.deleteAll = function (component) {
    component.$http.delete(API.ITEMS).then(response => {
        component.$emit('deleteAll');
    }).catch(err => toastr.error(component.$t('errors.default')));
};

deleteAll.local.deleteAll = function (component) {
    localStorage.clear();
    component.$emit('deleteAll');
};