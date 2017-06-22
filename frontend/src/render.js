import i18n from './plugins/i18n';
export function renderValidationErrors(errors) {
    let res = [];
    errors.forEach(err => {
        if (err.id === 'mustBeLessThan') {
            let str = i18n.t('item.' + err.properties[0]) + ' ' + i18n.t('errors.' + err.id) + ' ' + i18n.t('item.' + err.properties[1]);
            res.push(str);
        }
        else {
            let str = err.properties.map(prop => i18n.t('item.' + prop)).join(', ') + ' ' + i18n.t('errors.' + err.id);
            res.push(str);
        }
    });
    return res;
}

export function transTypeList(typeList) {

    return typeList.map(function (prop) {
        return {
            value: prop,
            trans: i18n.t('types.' + prop)
        };
    });
}
