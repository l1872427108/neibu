import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import i18n from './lang';
import { loadStyle } from './utils/util';
import iconfont from './config/iconfontSite';
import './components/global';
import './error';
import './plugins/element';
import './config/vueConfig';
import './styles/index.scss';
import './permission';
import './directives';
process.env.NODE_ENV === 'development' ? require('../mock') : '';

iconfont.iconfontVersion.forEach(ele => {
    loadStyle(iconfont.iconfontUrl.replace('$key', ele));
});

new Vue({
    router,
    store,
    i18n,
    "render": h => h(App)
}).$mount('#app');
