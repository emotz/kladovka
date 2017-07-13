export default {
    item: {
        name: "Item",
        type: "Type",
        aps: "Attacks per second",
        minDmg: "Min damage",
        maxDmg: "Max damage",
        critChance: "Critical chance",
        critDmg: "Critical damage",
        dps: "Damage per second",
        totalDps: "Total character dps"
    },
    char: {
        title: "Character",
        buttonUpdate: "Update",
        stats: {
            critChance: "Critical chance",
            critDmg: "Critical damage",
            atkSpd: "Attack speed",
            dmg: "Damage",
        }
    },
    types: {
        "mace": "mace",
        "dagger": "dagger",
        "spear": "spear",
        "sword": "sword",
        "axe": "axe",
        "fistWeapon": "fist weapon",
        "flail": "flail",
        "mightyWeapon": "mighty weapon",
        "ceremonialKnife": "ceremonial knife"
    },
    list: {
        title: "Items in Kladovka",
        buttonDelete: "Delete",
        buttonDeleteAll: "Delete all",
        buttonAddItem: "Add item",
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
        notFound: "Resource is not found"
    }
};