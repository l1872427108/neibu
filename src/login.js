import Vue from 'vue';
import Login from './views/login/index.vue';
import store from './store';
import i18n from './lang';
import './error';
import './plugins/element';
import './config/vueConfig';
import './assets/styles/index.scss';
import './permission';
import './directives';
process.env.NODE_ENV === 'development' ? require('../mock') : '';

const req = require.context('./assets/svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);

new Vue({
    store,
    i18n,
    "render": h => h(Login)
}).$mount('#login');
