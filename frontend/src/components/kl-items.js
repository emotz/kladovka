import API from 'api.json';
import urlJoin from 'url-join';
import { renderValidationError } from '../services/render';
import klAddItem from './kl-add-item.vue';
import klDeleteAll from './kl-delete-all.vue';
import { dps, aps, totalDps } from 'domain/Item';
import { items } from './kl-items.method.js';

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
        if (localStorage.getItem('token'))
            items.remote.mounted(this);
        else
            items.local.mounted(this);
    },
    methods: {
        deleteItem: function (id, index) {
            if (localStorage.getItem('token'))
                items.remote.deleteItem(this, id, index);
            else
                items.local.deleteItem(this, id, index);
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
        '$store.state.signIn': function (newVal) {
            if (newVal === true) {
                this.$http.post(urlJoin(API.ITEMS, 'collections'), this.items).then(response => {
                    for (let id in localStorage) {
                        if (id === 'user' || id === 'token') continue;
                        localStorage.removeItem(id);
                    }
                    this.$store.setSignIn(false);
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
    },
    computed: {
        sorted: function () {
            if (this.sort)
                this[this.sort]();
            return this.items;
        }
    }
};
