import * as items from '../items.js';
import toastr from 'toastr';
import { focus } from 'vue-focus';
export default {
    directives: { focus: focus },
    props: ['focusProp'],
    data: function () {
        return {
            focused: false,
            apsList: items.aps,
            typeList: items.type,
            type: items.type[0],
            aps: items.aps[0],
            minDmg: 2,
            maxDmg: 3,
        };
    },
    methods: {
        addItem: function () {
            let item = { type: this.type, aps: this.aps, minDmg: this.minDmg, maxDmg: this.maxDmg };
            this.$http.post('/api/items/', item).then(response => {
                item._id = response.body.added_id;
                this.$emit('addItem', item);
            }).catch(err => toastr.error('Internal Server Error'));
        },
        statControl: function () {
            if (this.minDmg < 2) this.minDmg = 2;
            if (this.maxDmg <= this.minDmg) this.maxDmg = this.minDmg + 1;
        }
    },
    watch: {
        focusProp: function (newVal, oldVal) {
            if (newVal === true && oldVal === false)
                this.focused = true;
        },
        focused: function (newVal, oldVal) {
            if (this.focusProp === true && oldVal === false && oldVal !== newVal) {
                this.focused = true;
            }
        }
    }
};