import klAddItem from './kl-add-item.vue';
import klDeleteAll from './kl-delete-all.vue';
import { dps, aps } from 'domain/Item';
import i18n from '../plugins/i18n';
export default {
    data: function () {
        return {
            items: [],
            focusAddItem: false,
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
                item.dps = dps(item).toFixed(2);
                item.type = i18n.t('types.'+item.type);
                this.items.push(item);
            }
        }).catch(err => toastr.error(i18n.t('errors.default')));
    },
    methods: {
        deleteItem: function (id, index) {
            this.$http.delete('/api/items/' + id).then(response => {
                this.items.splice(index, 1);
            }).catch(err => toastr.error(i18n.t('errors.default')));
        },
        addItem: function (item) {
            item.aps = aps(item);
            item.dps = dps(item).toFixed(2);
            item.type = i18n.t('types.'+item.type);
            this.items.push(item);
        },
        deleteAll: function (item) {
            this.items = [];
        }
    }
};