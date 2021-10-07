import Vue from 'vue';
import App from '~/App.vue';
import router from '~/router';
import store from '~/store';
import i18n from '~/lang';
import ELEMENT from 'element-ui';
import { loadStyle } from './utils/util';
import iconfont from '~/config/iconfontSite';
import '~/assets/styles/index.scss';
import '~/permission';
import '~/directives';
import 'element-ui/lib/theme-chalk/index.css';
const req = require.context('~/assets/svg', false, /\.svg$/);
const requireAll = requireContext => requireContext.keys().map(requireContext);
requireAll(req);
iconfont.iconfontVersion.forEach(ele => {
    loadStyle(iconfont.iconfontUrl.replace('$key', ele));
});
Vue.use(ELEMENT);

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
