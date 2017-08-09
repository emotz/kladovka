import { deleteAll } from './kl-delete-all.method.js';

export default {
    methods: {
        deleteAll: function () {
            if (localStorage.getItem('token'))
                deleteAll.remote.deleteAll(this);
            else
                deleteAll.local.deleteAll(this);
        },
    }
};