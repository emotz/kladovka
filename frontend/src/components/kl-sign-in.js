import API from 'api.json';
import { renderValidationError } from '../services/render';

export default {
    data: function () {
        return {
            email: '',
            password: ''
        };
    },
    methods: {
        signIn: function () {
            this.$http.post(API.TOKENS, { email: this.email, password: this.password }).then(response => {
                this.$emit('signIn', response.body);
            }).catch(err => {
                if (err.status === 400 && err.body.code === 1) {
                    let renderedErrors = renderValidationError(err.body.errors);
                    renderedErrors.forEach(error => toastr.error(this.$t('errors.' + error.id, error.props)));
                } else if (err.status === 401 && err.body.code === 3) {
                    let renderedErrors = renderValidationError(err.body.errors);
                    renderedErrors.forEach(error => toastr.error(this.$t('errors.' + error.id, error.props)));
                } else
                    toastr.error(this.$t('errors.default'));
            });

        }
    }
};