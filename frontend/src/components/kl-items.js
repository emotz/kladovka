import API from 'api.json';
import urlJoin from 'url-join';
import { clone } from 'domain/utility';
import { renderValidationError } from '../services/render';
import klAddItem from './kl-add-item.vue';
import klDeleteAll from './kl-delete-all.vue';
import { dps, aps, totalDps } from 'domain/Item';
import { callMethod } from './kl-items.method.js';

export default {
    data: function () {
        return {
            items: [],
            focusAddItem: false,
            sort: ''
        };
    },
    components: {
        'kl-add-item': klAddItem,
        'kl-delete-all': klDeleteAll,
    },
    mounted: function () {
        callMethod(this, 'mounted');

    },
    methods: {
        deleteItem: function (id, index) {
            callMethod(this, 'deleteItem', id, index);
        },
        addItem: function (item) {
            item.aps = aps(item);
            item.dps = dps(item).toFixed(2);
            item.type = this.$t('types.' + item.type);
            item.totalDps = totalDps(item, this.$store.state.char).toFixed(2);
            this.items.push(item);
        },
        deleteAll: function (item) {
            this.items = [];
        },
        'sort-dps-asc': function () {
            this.items.sort((a, b) => { return a.totalDps - b.totalDps; });
        },
        'sort-dps-desc': function () {
            this.items.sort((a, b) => { return b.totalDps - a.totalDps; });
        }
    },
    watch: {
        '$store.state.char': function (newVal) {
            this.items = this.items.map(item => {
                item.totalDps = totalDps(item, newVal).toFixed(2);
                return item;
            });
        },
        '$store.state.signOut': function (newVal) {
            if (newVal === true) {
                this.items = [];
                this.$store.setSignOut(false);
            }
        },
        '$store.state.signIn': async function (newVal) {
            if (newVal === true) {
                try {
                    let _id,
                        char;
                    let resGetChar = await this.$http.get(API.CHARS);
                    if (resGetChar.status === 204) {
                        char = clone(this.$store.state.char);
                        let resPostChar = await this.$http.post(API.CHARS, char);
                        _id = resPostChar.body.added_id;
                        char._id = _id;
                    }
                    else if (resGetChar.status === 200) {
                        if (localStorage.getItem('char')) {
                            _id = resGetChar.body._id;
                            char = clone(this.$store.state.char);
                            char._id = _id;
                            await this.$http.put(urlJoin(API.CHARS, _id), char);
                        } else
                            char = resGetChar.body;
                    }
                    await callMethod(this, 'charAndItems', char);
                } catch (err) {
                    if (err.status === 400 && err.body.code === 1) {
                        let renderedErrors = renderValidationError(err.body.errors);
                        renderedErrors.forEach(error => toastr.error(this.$t('errors.' + error.id, error.props)));
                    } else if (err.status === 401 && err.body.code === 3) {
                        let renderedErrors = renderValidationError(err.body.errors);
                        renderedErrors.forEach(error => toastr.error(this.$t('errors.' + error.id, error.props)));
                    } else
                        toastr.error(this.$t('errors.default'));
                }
            }
        }
    },
    computed: {
        sorted: function () {
            if (this.sort)
                this[this.sort]();
            return this.items;
        }
    }
};
