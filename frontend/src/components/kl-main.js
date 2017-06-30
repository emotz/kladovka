import klItems from './kl-items.vue';
import klChar from './kl-char.vue';
import i18n from '../plugins/i18n.js';
export default {
    data: function () {
        return {};
    },
    components: {
        'kl-items': klItems,
        'kl-char': klChar,
    },
    i18n
};