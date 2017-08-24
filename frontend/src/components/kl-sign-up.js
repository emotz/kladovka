import API from 'api.json';
import { renderValidationError } from '../services/render';

export default {
    data: function () {
        return {
            email: '',
            name: '',
            password: ''
        };
    },
    methods: {
        signUp: function () {
            let user = {
                email: this.email,
                name: this.name,
                password: this.password
            };
            this.$http.post(API.USERS, user)
                .then(() =>
                    this.$http.post(API.TOKENS, { email: this.email, password: this.password }))
                .then(response => {
                    this.$emit('signIn', response.body);
                })
                .catch(err => {
                    if (err.status === 400 && err.body.code === 1) {
                        let renderedErrors = renderValidationError(err.body.errors);
                        renderedErrors.forEach(error => toastr.error(this.$t('errors.' + error.id, error.props)));
                    } else if (err.status === 409 && err.body.code === 2) {
                        let renderedErrors = renderValidationError(err.body.errors);
                        renderedErrors.forEach(error => toastr.error(this.$t('errors.' + error.id, error.props)));
                    } else if (err.status === 400 && err.body.code === 3) {
                        let renderedErrors = renderValidationError(err.body.errors);
                        renderedErrors.forEach(error => toastr.error(this.$t('errors.' + error.id, error.props)));
                    } else
                        toastr.error(this.$t('errors.default'));
                });
        }
    }
};