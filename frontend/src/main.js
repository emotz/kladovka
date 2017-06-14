import 'toastr.css';
import 'bootstrap.css';
import 'bootstrap';
import 'nprogress.css';
import Vue from 'vue';
import VueResource from 'vue-resource';
import VueResourceNProgress from 'vue-resource-nprogress';
import app from './components/kl-main.vue';

Vue.use(VueResource);
Vue.use(VueResourceNProgress);
new Vue(app).$mount('#app');