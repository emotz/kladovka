import _ from 'lodash';
import klSignIn from './kl-sign-in.vue';
import klSignUp from './kl-sign-up.vue';

export default {
    data: function () {
        return {
            user: localStorage.getItem('user'),
        };
    },
    components: {
        'kl-sign-in': klSignIn,
        'kl-sign-up': klSignUp
    },
    methods: {
        signIn: function (body) {
            localStorage.setItem('token', body.accessToken);
            let user = _.upperFirst(body.user);
            localStorage.setItem('user', user);
            this.user = user;
            this.$store.setSignIn(true);
        },
        signOut: function () {
            localStorage.clear();
            this.user = '';
            this.$store.clearChar();
            this.$store.state.signOut = true;
        }
    }
};