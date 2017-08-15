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
    methods: {
        replaceChar: function () {
            if (localStorage.getItem('token'))
                char.remote.replaceChar(this);
            else
                char.local.replaceChar(this);
        }
    }
};