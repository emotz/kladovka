import { callMethod } from './kl-char.method.js';

export default {
    data: function () {
        return {
            char: {
                _id: undefined,
                atkSpd: 0,
                dmg: 0,
                critChance: 0,
                critDmg: 0
            }
        };
    },
    mounted: function () {
        callMethod(this, 'mounted');
    },
    methods: {
        replaceChar: function () {
            callMethod(this, 'replaceChar');
        }
    },
    watch: {
        '$store.state.char': function (newVal) {
            this.char = newVal;
        }
    }
};