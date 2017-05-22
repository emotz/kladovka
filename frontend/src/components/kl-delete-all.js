export default {
    data: function () {
        return {};
    },
    methods: {
        deleteAll: function () {
            this.$http.delete('http://localhost:8080/api/items/').then(response => {
                this.$emit('deleteAll');
            }).catch(err => console.log('oops'));
        },
    }
};