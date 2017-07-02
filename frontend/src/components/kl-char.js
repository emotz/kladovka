import store from './store.js';
import { clone } from 'domain/utility';
import { renderValidationErrors } from '../render';
export default {
    data: function () {
        return {
            _id: undefined,
            char: {
                atkSpd: 0,
                dmg: 0,
                critChance: 0,
                critDmg: 0
            },
            store
        };
    },
    methods: {
        updateChar: function () {
            if (this._id === undefined) {
                let char = clone(this.char);
                this.$http.post('/api/chars', char).then(response => {
                    this._id = response.body.added_id;
                    store.setCharAction(char);
                }).catch(err => {
                    toastr.error(this.$t('errors.default'));
                });
            } else {
                let char = clone(this.char);
                this.$http.put('/api/chars/' + this._id, char).then(response => {
                    store.setCharAction(char);
                }).catch(err => {
                    if (err.status === 400 && err.body.code === 1) {
                        let renderedErrors = renderValidationErrors(err.body.errors);
                        renderedErrors.forEach(error => toastr.error(this.$t('errors.' + error.id, error.props)));
                    } else if (err.status === 404)
                        toastr.error(this.$t('errors.notFound'));
                    else
                        toastr.error(this.$t('errors.default'));
                });
            }
        },
        critChanceControl: function () {
            if (this.char.critChance < 0) this.char.critChance = 0;
        },
        critDmgControl: function () {
            if (this.char.critDmg < 0) this.char.critDmg = 0;
        },
        dmgControl: function () {
            if (this.char.dmg < 0) this.char.dmg = 0;
        },
        atkSpdControl: function () {
            if (this.char.atkSpd < 0) this.char.atkSpd = 0;
        },
    }
};