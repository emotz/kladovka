export default {
    item: {
        name: "Предмет",
        type: "Тип",
        aps: "Атак в секунду",
        minDmg: "Минимальный урон",
        maxDmg: "Максимальный урон",
        critChance: "Шанс критического удара",
        critDmg: "Критический урон",
        dps: "Урон в секунду",
        totalDps: "Итоговый увс персонажа"
    },
    char: {
        title: "Персонаж",
        buttonUpdate: "Обновить",
        stats: {
            critChance: "Шанс критического удара",
            critDmg: "Критический урон",
            atkSpd: "Скорость атаки",
            dmg: "Урон",
        }
    },
    types: {
        "mace": "булава",
        "dagger": "кинжал",
        "spear": "копьё",
        "sword": "меч",
        "axe": "топор",
        "fistWeapon": "кистевое оружие",
        "flail": "кистень",
        "mightyWeapon": "мощное оружие",
        "ceremonialKnife": "церемониальный нож"
    },
    list: {
        title: "Предметы в Kladovka",
        buttonDelete: "Удалить",
        buttonDeleteAll: "Удалить всё",
        buttonAddItem: "Добавить предмет",
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
        content: "Вы уверены что хотите удалить все предметы из Kladovka?",
        buttonCancel: "Отмена",
        buttonOk: "Удалить",
    },
    errors: {
        default: "Упс, что-то пошло не так",
        mustBeNumber: "{allProps} должен быть числом",
        mustBeLessThan: "{minDmg} должен быть меньше чем {maxDmg}",
        mustBePositive: "{allProps} должен быть положительным",
        notValidType: "{allProps} не правильный тип",
        notFound: "Ресурс не найден",
        emailAlreadyExists: "Такой email уже существует",
        invalidToken: "Неправильный токен",
        emailOrPasswordInvalid: "Неправильный email или пароль"
    },
    sort: {
        title: "Сортировка по",
        dpsAsc: "увеличению увс",
        dpsDesc: "уменьшению увс"
    },
    header: {
        signUp: "Зарегистрироваться",
        signIn: "Войти",
        signOut: "Выйти",
        hello: "Прювет, "
    },
    signIn: {
        title: "Вход в Kladovka",
        email: "Email адрес:",
        password: "Пароль:",
        buttonCancel: "Отмена",
        buttonOk: "Войти",
    },
    signUp: {
        title: "Регистрация в Kladovka",
        email: "Email адрес:",
        name: "Имя:",
        password: "Пароль:",
        buttonCancel: "Отмена",
        buttonOk: "Зарегистрироваться",
    }
};