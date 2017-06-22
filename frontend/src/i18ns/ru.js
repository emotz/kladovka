export default {
    item: {
        name: "Предмет",
        type: "Тип",
        aps: "Атак в секунду",
        minDmg: "Минимальный урон",
        maxDmg: "Максимальный урон",
        dps: "Урон в секунду",
    },
    types: {
        'mace': 'булава',
        'dagger': 'кинжал',
        'spear': 'копьё',
        'sword': 'меч',
        'axe': 'топор',
        'firstWeapon': 'кистевое оужие',
        'flail': 'кистень',
        'mightyWeapon': 'мощное оружие',
        'ceremonialKnife': 'церемониальный нож'
    },
    list: {
        title: "Предметы в ",
        buttonDelete: 'Удалить',
        buttonDeleteAll: 'Удалить всё',
        buttonAddItem: 'Добавить предмет',
    },
    addItem: {
        title: "Добавить предмет",
        type: "Тип",
        minDmg: "Минимальный урон",
        maxDmg: "Максимальный урон",
        buttonCancel: "Отмена",
        buttonOk: "Добавить",
    },
    deleteAll: {
        title: "Удалить все предметы",
        content: "Вы увеверны что хотите удалить все предметы из ",
        buttonCancel: "Отмена",
        buttonOk: 'Удалить',
    },
    errors: {
        default: "Упс, что-то пошло не так",
        mustBeNumber: "должен быть числом",
        mustBeLessThan: "должен быть меньше чем",
        mustBePositive: "должен быть положительным",
        notValidType: "не правильный тип"
    }
};