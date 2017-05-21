import * as items from '../items.js';
export default {
    data: function () {
        return {
            type: '',
            aps: 0,
            minDmg: 2,
            maxDmg: 3,
            apsList: items.aps,
            typeList: items.type
        };
    },
    methods: {
        addItem: function () {
            let item = { type: this.type, aps: this.aps, minDmg: this.minDmg, maxDmg: this.maxDmg };
            this.$http.post('http://localhost:8080/api/items/', item).then(res => {
                this.$emit('added', item);
            }).catch(err => console.log('oops'));
        }
    },
    watch: {
        minDmg: function (val) {
            if (val < 1) this.minDmg = 1;
            if (val >= this.maxDmg) this.maxDmg = val + 1;
        },
        maxDmg: function (val) {
            if (val <= this.minDmg)
                this.minDmg = val - 1;
        },
    },
};