import * as items from '../items.js';
export default {
    data: function () {
        return {
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
            this.$http.post('http://localhost:8080/api/items/', item).then(res => {
                this.$emit('added', item);
            }).catch(err => console.log('oops'));
        },
        statControl: function () {
            if (this.minDmg < 2) this.minDmg = 2;
            if (this.maxDmg <= this.minDmg) this.maxDmg = this.minDmg + 1;
        }
    },
};