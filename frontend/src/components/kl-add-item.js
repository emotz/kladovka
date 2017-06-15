import * as Item from 'domain/Item';
import { focus } from 'vue-focus';
export default {
    directives: { focus: focus },
    props: ['focusProp'],
    data: function () {
        return {
            focused: false,
            typeList: Item.types,
            type: Item.types[0],
            minDmg: 2,
            maxDmg: 3,
        };
    },
    methods: {
        addItem: function () {
            let item = { type: this.type, minDmg: this.minDmg, maxDmg: this.maxDmg };
            item.aps = Item.aps(item);
            this.$http.post('/api/items/', item).then(response => {
                item._id = response.body.added_id;
                this.$emit('addItem', item);
            }).catch(err => {
                if (err.status === 400) {
                    let arrErr = err.body.errors;
                    arrErr.forEach(error => toastr.error(error.id));
                } else
                    toastr.error('Oops, something went wrong');
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