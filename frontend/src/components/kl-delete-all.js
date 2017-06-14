export default {
    methods: {
        deleteAll: function () {
            this.$http.delete('/api/items/').then(response => {
                this.$emit('deleteAll');
            }).catch(err => toastr.error('Oops, something went wrong'));
        },
    }
};