import { clone } from 'domain/utility';

let store = {
    state: {
        char: {
            _id: undefined,
            atkSpd: 0,
            dmg: 0,
            critChance: 0,
            critDmg: 0
        },
        signIn: false,
        signOut: false
    },
    setSignIn(newValue) {
        this.state.signIn = newValue;
    },
    setSignOut(newValue) {
        this.state.signOut = newValue;
    },
    setChar(newValue) {
        this.state.char = clone(newValue);
    },
    clearChar() {
        this.state.char = {
            _id: undefined,
            atkSpd: 0,
            dmg: 0,
            critChance: 0,
            critDmg: 0
        };
    }
};
export default {
    install(Vue, options) {
        Vue.prototype.$store = store;
    }
};