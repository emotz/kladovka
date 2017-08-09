let store = {
    state: {
        char: {
            atkSpd: 0,
            dmg: 0,
            critChance: 0,
            critDmg: 0
        },
        signOut: false,
    },
    setSignOut(newValue) {
        this.state.signOut = newValue;
    },
    setChar(newValue) {
        this.state.char = newValue;
    },
    clearChar() {
        this.state.char = {};
    }
};
export default {
    install(Vue, options) {
        Vue.prototype.$store = store;
    }
};