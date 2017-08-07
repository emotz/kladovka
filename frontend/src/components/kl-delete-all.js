import { deleteAll } from './kl-delete-all.method.js';

export default {
    methods: {
        deleteAll: function () {
            deleteAll[this.$store.state.storageType].deleteAll(this);
        },
    }
};