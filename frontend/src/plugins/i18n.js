// временное решение, проблема будет решена в https://github.com/emotz/kladovka/issues/57
import config from '../../../config/config.json';
import en from '../i18ns/en.js';
import ru from '../i18ns/ru.js';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

export default new VueI18n({
    locale: config.default_language,
    messages: { en, ru }
});