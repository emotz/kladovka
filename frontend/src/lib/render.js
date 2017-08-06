import i18n from '../plugins/i18n';
export function renderValidationErrors(errors) {
    let res = [];
    errors.forEach(error => {
        let id = error.id,
            props = {};
        if (id === 'mustBeLessThan') {
            props = {
                minDmg: i18n.t('item.' + error.properties[0]),
                maxDmg: i18n.t('item.' + error.properties[1])
            };
        }
        else {
            props.allProps = error.properties
                .map(prop => i18n.t('item.' + prop))
                .join(', ');
        }
        res.push({ id, props });
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
