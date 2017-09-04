import en from '../i18ns/en.js';
import ru from '../i18ns/ru.js';
import Vue from 'vue';
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

export default new VueI18n({
    locale: 'en',
    messages: { en, ru }
});