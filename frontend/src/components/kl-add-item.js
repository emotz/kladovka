import * as items from '../items.js';
import { setAps } from 'domain/calculation';
import toastr from 'toastr';
import { focus } from 'vue-focus';
export default {
    directives: { focus: focus },
    props: ['focusProp'],
    data: function () {
        return {
            focused: false,
            typeList: items.type,
            type: items.type[0],
            minDmg: 2,
            maxDmg: 3,
        };
    },
    methods: {
        addItem: function () {
            let item = { type: this.type, minDmg: this.minDmg, maxDmg: this.maxDmg };
            this.$http.post('/api/items/', setAps(item)).then(response => {
                item._id = response.body.added_id;
                this.$emit('addItem', item);
            }).catch(err => toastr.error('Oops, something went wrong'));
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