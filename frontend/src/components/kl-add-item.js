import * as Item from 'domain/Item';
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
            type: Item.types[0],
            minDmg: 1,
            maxDmg: 2,
            critChance: 0,
            critDmg: 0
        };
    },
    methods: {
        addItem: function () {
            let item = {
                type: this.type,
                minDmg: this.minDmg,
                maxDmg: this.maxDmg,
                critChance: this.critChance,
                critDmg: this.critDmg
            };
            this.$http.post('/api/items/', item).then(response => {
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
        statControl: function () {
            if (this.minDmg < 1) this.minDmg = 1;
            if (this.minDmg > this.maxDmg) this.maxDmg = this.minDmg;
            if (this.critChance < 0) this.critChance = 0;
            if (this.critDmg < 0) this.critDmg = 0;
        }
    },

    watch: {
        focusProp: function (newVal) {
            this.focused = newVal;
        }
    }
};