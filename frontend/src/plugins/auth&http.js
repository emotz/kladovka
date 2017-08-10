import Vue from 'vue';
import VueResource from 'vue-resource';

Vue.use(VueResource);
Vue.http.interceptors.push(function (request, next) {
    let token = localStorage.getItem('token');
    if (request.headers['Authorization'] === undefined && token) {
        request.headers.set('Authorization', 'Bearer ' + token);
        console.log('zaebca!');
    }
    next();
});