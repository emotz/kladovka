import { char } from './kl-char.method.js';

export default {
    data: function () {
        return {
            _id: undefined,
            char: {
                atkSpd: 0,
                dmg: 0,
                critChance: 0,
                critDmg: 0
            }
        };
    },
    methods: {
        replaceChar: function () {
            char[this.$store.state.storageType].replaceChar(this);
        }
    }
};