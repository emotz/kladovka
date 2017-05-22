import kl_add_item from './kl-add-item.vue';
import kl_delete_all from './kl-delete-all.vue';
export default {
    data: function () {
        return {
            items: []
        };
    },
    components: {
        'kl-add-item': kl_add_item,
        'kl-delete-all': kl_delete_all,
    },
    mounted: function () {
        this.$http.get('http://localhost:8080/api/items/').then(response => {
            this.items = response.body;
        }).catch(err => console.log('oops'));
    },
    methods: {
        deleteItem: function (id, index) {
            this.$http.delete('http://localhost:8080/api/items/' + id).then(response => {
                this.items.splice(index, 1);
            }).catch(err => console.log('oops'));
        },
        addItem: function (item) {
            this.items.push(item);
        },
        deleteAll: function (item) {
            this.items=[];
        }
    }
};