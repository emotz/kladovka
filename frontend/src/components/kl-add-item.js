import api from '../../../config/api.json';
import * as Item from 'domain/Item';
import { clone } from 'domain/utility';
import { renderValidationErrors } from '../render';
import { transTypeList } from '../render';
import { focus } from 'vue-focus';
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
            let item = clone(this.item);
            this.$http.post(api.items, item).then(response => {
                item._id = response.body.added_id;
                this.$emit('addItem', item);
            }).catch(err => {
                if (err.status === 400 && err.body.code === 1) {
                    let renderedErrors = renderValidationErrors(err.body.errors);
                    renderedErrors.forEach(error => toastr.error(this.$t('errors.' + error.id, error.props)));
                } else
                    toastr.error(this.$t('errors.default'));
            });
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