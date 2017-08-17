import { char } from './kl-char.method.js';

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
        if (localStorage.getItem('token'))
            char.remote.mounted(this);
        else
            char.local.mounted(this);
    },
    methods: {
        replaceChar: function () {
            if (localStorage.getItem('token'))
                char.remote.replaceChar(this);
            else
                char.local.replaceChar(this);
        }
    },
    watch: {
        '$store.state.char': function (newVal) {
            this.char = newVal;
        }
    }
};