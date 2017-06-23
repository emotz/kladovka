export default {
    methods: {
        deleteAll: function () {
            this.$http.delete('/api/items/').then(response => {
                this.$emit('deleteAll');
            }).catch(err => toastr.error(this.$t('errors.default')));
        },
    }
};