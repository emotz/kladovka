import klAddItem from './kl-add-item.vue';
import klDeleteAll from './kl-delete-all.vue';
import { dps, aps, totalDps } from 'domain/Item';
import { items } from './kl-items.method.js';

export default {
    data: function () {
        return {
            items: [],
            focusAddItem: false,
            sort: ''
        };
    },
    components: {
        'kl-add-item': klAddItem,
        'kl-delete-all': klDeleteAll,
    },
    mounted: function () {
        items[this.$store.state.storageType].mounted(this);
    },
    methods: {
        deleteItem: function (id, index) {
            items[this.$store.state.storageType].deleteItem(this, id, index);
        },
        addItem: function (item) {
            item.aps = aps(item);
            item.dps = dps(item).toFixed(2);
            item.type = this.$t('types.' + item.type);
            item.totalDps = totalDps(item, this.$store.state.char).toFixed(2);
            this.items.push(item);
        },
        deleteAll: function (item) {
            items[this.$store.state.storageType].deleteAll(this);
        },
        'sort-dps-asc': function () {
            this.items.sort((a, b) => { return a.totalDps - b.totalDps; });
        },
        'sort-dps-desc': function () {
            this.items.sort((a, b) => { return b.totalDps - a.totalDps; });
        }
    },
    watch: {
        '$store.state.char': function (newVal) {
            this.items = this.items.map(item => {
                item.totalDps = totalDps(item, newVal).toFixed(2);
                return item;
            });
        }
    },
    computed: {
        sorted: function () {
            if (this.sort)
                this[this.sort]();
            return this.items;
        }
    }
};
