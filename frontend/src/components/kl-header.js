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
        signIn: function (user) {
            this.user = user;
        },
        signOut: function () {
            localStorage.clear();
            this.user = '';
            this.$store.state.signOut = true;
        }
    }
};