import i18n from '../plugins/i18n';
export function renderValidationError(errors) {
    let res = [];
    let count = 0;
    errors.forEach(error => {
        let id = error.id,
            props = {};
        if (id === 'mustBeLessThan') {
            props = {
                minDmg: i18n.t('item.' + error.properties[0]),
                maxDmg: i18n.t('item.' + error.properties[1])
            };
            count = 2;
        }
        else {
            props.allProps = error.properties
                .map(prop => {
                    count++;
                    return i18n.t('item.' + prop);
                })
                .join(', ');
        }
        res.push({ id, props, count });
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
