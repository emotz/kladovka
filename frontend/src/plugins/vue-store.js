let store = {
    state: {
        char: {
            atkSpd: 0,
            dmg: 0,
            critChance: 0,
            critDmg: 0
        },
        storageType: 'local'
    },
    setStorageAction(newValue) {
        this.state.storageType = newValue;
    },
    setCharAction(newValue) {
        this.state.char = newValue;
    },
    clearCharAction() {
        this.state.char = {};
    }
};
export default {
    install(Vue, options) {
        Vue.prototype.$store = store;
    }
};