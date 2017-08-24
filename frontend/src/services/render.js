export function translateError(component, error) {
    if (error.id === 'mustBeLessThan') {
        let translatedProps = {
            minDmg: component.$t('item.' + error.properties[0]),
            maxDmg: component.$t('item.' + error.properties[1])
        };
        return component.$t('errors.' + error.id, translatedProps);
    } else {
        let single = (Object.keys(error.properties).length > 1) ? false : true;
        let translatedProps = error.properties.map(prop => component.$t('item.' + prop)).join(', ');
        return translatedProps + ' ' + component.$tc('errors.' + error.id, single);
    }
}

export function translateTypeList(component, typeList) {
    return typeList.map(function (prop) {
        return {
            value: prop,
            trans: component.$t('types.' + prop)
        };
    });
}
