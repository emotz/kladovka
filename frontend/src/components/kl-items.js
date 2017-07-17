import klAddItem from './kl-add-item.vue';
import klDeleteAll from './kl-delete-all.vue';
import { dps, aps, totalDps } from 'domain/Item';
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
        this.$http.get('/api/items/').then(response => {
            for (let i in response.body) {
                let item = response.body[i];
                this.addItem(item);
            }
        }).catch(err => toastr.error(this.$t('errors.default')));
    },
    methods: {
        deleteItem: function (id, index) {
            this.$http.delete('/api/items/' + id).then(response => {
                this.items.splice(index, 1);
            }).catch(err => toastr.error(this.$t('errors.default')));
        },
        addItem: function (item) {
            item.aps = aps(item);
            item.dps = dps(item).toFixed(2);
            item.type = this.$t('types.' + item.type);
            item.totalDps = totalDps(item, this.$store.state.char).toFixed(2);
            this.items.push(item);
        },
        deleteAll: function (item) {
            this.$http.delete('api/items').then(response => {
                this.items = [];
            }).catch(err => toastr.error(this.$t('errors.default')));
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
