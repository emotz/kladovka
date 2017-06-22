import i18n from '../plugins/i18n';
export default {
    methods: {
        deleteAll: function () {
            this.$http.delete('/api/items/').then(response => {
                this.$emit('deleteAll');
            }).catch(err => toastr.error(i18n.t('errors.default')));
        },
    }
};