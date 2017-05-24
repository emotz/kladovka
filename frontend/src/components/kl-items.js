import toastr from 'toastr';
import klAddItem from './kl-add-item.vue';
import klDeleteAll from './kl-delete-all.vue';
import { dps } from 'domain/calculation.js';
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
                item.dps = dps(item);
                this.items.push(item);
            }
        }).catch(err => toastr.error('Internal Server Error'));
    },
    methods: {
        deleteItem: function (id, index) {
            this.$http.delete('/api/items/' + id).then(response => {
                this.items.splice(index, 1);
            }).catch(err => toastr.error('Internal Server Error'));
        },
        addItem: function (item) {
            item.dps = dps(item);
            this.items.push(item);
        },
        deleteAll: function (item) {
            this.items = [];
        }
    }
};