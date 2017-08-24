import 'toastr.css';
import 'bootstrap.css';
import 'bootstrap';
import 'nprogress.css';
import Vue from 'vue';
import VueResourceNProgress from 'vue-resource-nprogress';
import VueStore from './plugins/vue-store';
import './plugins/http';
import app from './components/kl-main.vue';

Vue.use(VueResourceNProgress);
Vue.use(VueStore);
new Vue(app).$mount('#app');