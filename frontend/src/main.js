import 'toastr.css';
import 'bootstrap.css';
import 'bootstrap';
import Vue from 'vue';
import VueResource from 'vue-resource';
import app from './components/kl-main.vue';

Vue.use(VueResource);
new Vue(app).$mount('#app');