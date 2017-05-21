import 'bootstrap.css';
import 'bootstrap.js';
import Vue from 'vue';
import vueResource from 'vue-resource';
import app from './components/kl-main.vue';

Vue.use(vueResource);
new Vue(app).$mount('#app');