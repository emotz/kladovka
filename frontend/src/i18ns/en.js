export default {
    item: {
        name: "Item",
        type: "Type",
        aps: "Attacks per second",
        minDmg: "Min damage",
        maxDmg: "Max damage",
        dps: "Damage per second",
    },
    types: {
        'mace': 'mace',
        'dagger': 'dagger',
        'spear': 'spear',
        'sword': 'sword',
        'axe': 'axe',
        'fistWeapon': 'first weapon',
        'flail': 'flail',
        'mightyWeapon': 'mighty weapon',
        'ceremonialKnife': 'ceremonial knife'
    },
    list: {
        title: "Items in Kladovka",
        buttonDelete: 'Delete',
        buttonDeleteAll: 'Delete all',
        buttonAddItem: 'Add item',
    },
    addItem: {
        title: "Add item",
        buttonCancel: "Cancel",
        buttonOk: "Add",
    },
    deleteAll: {
        title: "Delete all items",
        content: "Are you sure want to delete all items from Kladovka?",
        buttonCancel: "Cancel",
        buttonOk: "Delete",
    },
    errors: {
        default: "Oops, something went wrong",
        mustBeNumber: "{allProps} must be number",
        mustBeLessThan: "{minDmg} must be less than {maxDmg}",
        mustBePositive: "{allProps} must be positive",
        notValidType: "{allProps} not valid type",
    }
};