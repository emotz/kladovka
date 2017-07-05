import store from './store';
import klAddItem from './kl-add-item.vue';
import klDeleteAll from './kl-delete-all.vue';
import { dps, aps, totalDps } from 'domain/Item';
export default {
    data: function () {
        return {
            items: [],
            focusAddItem: false,
            store
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
                item.aps = aps(item);
                item.dps = dps(item);
                item.type = this.$t('types.' + item.type);
                item.totalDps = totalDps(item, store.state.char);
                this.items.push(item);
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
            item.dps = dps(item);
            item.type = this.$t('types.' + item.type);
            item.totalDps = totalDps(item, store.state.char);
            this.items.push(item);
        },
        deleteAll: function (item) {
            this.items = [];
        }
    },
    watch: {
        ['store.state.char']: function (newVal) {
            this.items = this.items.map(item => {
                item.totalDps = totalDps(item, newVal);
                return item;
            });
        }
    }
};
