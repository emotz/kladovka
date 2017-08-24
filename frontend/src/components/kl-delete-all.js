import API from 'api.json';
export default {
    methods: {
        deleteAll: function () {
            this.$http.delete(API.ITEMS).then(response => {
                this.$emit('deleteAll');
            }).catch(err => toastr.error(this.$t('errors.default')));
        },
    }
};