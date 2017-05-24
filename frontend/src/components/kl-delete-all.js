import toastr from 'toastr';
export default {
    data: function () {
        return {};
    },
    methods: {
        deleteAll: function () {
            this.$http.delete('/api/items/').then(response => {
                this.$emit('deleteAll');
            }).catch(err => toastr.error('Internal Server Error'));
        },
    }
};