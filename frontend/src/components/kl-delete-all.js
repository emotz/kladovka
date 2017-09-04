import { callMethod } from './kl-delete-all.method.js';

export default {
    methods: {
        deleteAll: function () {
            callMethod(this, 'deleteAll');
        },
    }
};