import Vue from 'vue';
import App from '~/App.vue';
import router from '~/router';
import store from '~/store';
import i18n from '~/lang';
import '~/styles/index.scss';
import '~/permission';
import '~/directives';
import '~/plugins/element';
const req = require.context('~/assets/svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);

Vue.config.productionTip = false;

Vue.prototype.$bus = new Vue();

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
