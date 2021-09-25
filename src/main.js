import Vue from 'vue';
import App from '~/App.vue';
import router from '~/router';
import store from '~/store';
import i18n from '~/lang';
import { loadStyle } from '~/utils/util';
import iconfont from '~/config/iconfontSite';
import './components/global';
// import '~/error';
import '~/plugins/element';
// import '~/config/vueConfig';
import '~/assets/styles/index.scss';
import '~/permission';
import '~/directives';
process.env.NODE_ENV === 'development' ? require('../mock') : '';

const req = require.context('~/assets/svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
iconfont.iconfontVersion.forEach(ele => {
    loadStyle(iconfont.iconfontUrl.replace('$key', ele));
});

import htmlToPdf from '@/utils/html';
Vue.use(htmlToPdf);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
