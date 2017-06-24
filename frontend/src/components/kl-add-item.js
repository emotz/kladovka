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
            minDmg: 2,
            maxDmg: 3,
        };
    },
    methods: {
        addItem: function () {
            let item = { type: this.type, minDmg: this.minDmg, maxDmg: this.maxDmg };
            this.$http.post('/api/items/', item).then(response => {
                item._id = response.body.added_id;
                item.aps = Item.aps(item);
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
            if (this.minDmg < 2) this.minDmg = 2;
            if (this.maxDmg <= this.minDmg) this.maxDmg = this.minDmg + 1;
        }
    },

    watch: {
        focusProp: function (newVal) {
            this.focused = newVal;
        }
    }
};