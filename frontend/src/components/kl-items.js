import kl_modal from './kl-modal.vue';
export default {
    data: function () {
        return {
            items: []
        };
    },
    components: {
        'kl-modal': kl_modal,
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
        deleteAll: function () {
            this.$http.delete('http://localhost:8080/api/items/').then(response => {
                this.items = [];
            }).catch(err => console.log('oops'));
        },
        added: function (item) {
            this.items.push(item);
        }
    }
};