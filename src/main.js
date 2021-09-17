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


// 提交登录
    // loginSubmit() {
    //   console.log("登录");
    //   // 如果在登录中，不允许登录
    //   if (this.subState) {
    //     return false;
    //   }
    //   if (!isvalidUsername(this.loginData.username)) {
    //     this.loginMessage = "请输入正确用户名";
    //     return false;
    //   }
    //   if (this.loginData.password.length < 6) {
    //     this.loginMessage = "请输入正确的用户名或密码";
    //     return false;
    //   }
    //   this.subState = true; // 提交中
    //   // 提交登录 , 不要以 / 开头
    //   this.$store
    //     .dispatch("UserLogin", this.loginData)
    //     .then((response) => {
    //       const { code, message } = response;
    //       if (code === 20000) {
    //         // 跳转回来源页面
    //         window.location.href = this.redirectURL;
    //       } else {
    //         this.loginMessage = message;
    //       }
    //       this.subState = false; // 提交完
    //     })
    //     .catch((error) => {
    //       // 进度条结束
    //       this.subState = false; // 提交完
    //       this.loginMessage = "系统繁忙，请稍后重试";
    //     });
    // },
