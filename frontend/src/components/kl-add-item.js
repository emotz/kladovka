import * as Item from 'domain/Item';
import { transTypeList } from '../services/render';
import { focus } from 'vue-focus';
import { callMethod } from './kl-add-item.method.js';

export default {
    directives: { focus: focus },
    props: ['focusProp'],
    data: function () {
        return {
            focused: false,
            typeList: transTypeList(Item.types),
            item: {
                type: Item.types[0],
                minDmg: 1,
                maxDmg: 1,
                critChance: 0,
                critDmg: 0
            }
        };
    },
    methods: {
        addItem: function () {
            callMethod(this, 'addItem');
        },
        dmgControl: function () {
            if (this.item.minDmg < 1) this.item.minDmg = 1;
            if (this.item.minDmg > this.item.maxDmg) this.item.maxDmg = this.item.minDmg;
        },
        critChanceControl: function () {
            if (this.item.critChance < 0) this.item.critChance = 0;
        },
        critDmgControl: function () {
            if (this.item.critDmg < 0) this.item.critDmg = 0;
        },
    },

    watch: {
        focusProp: function (newVal) {
            this.focused = newVal;
        }
    }
};