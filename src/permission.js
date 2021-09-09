import router from './router';
import getPageTitle from './utils/getPageTitle';
import {
  Cookie,
  Key
} from './utils/cookie';
import store from './store';

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  document.title = getPageTitle(to.meta.title);
  const hasToken = Cookie.get(Key.accessTokenKey);
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const hasGetUserInfo = Cookie.get(Key.userInfoKey);
      console.log(JSON.parse(hasGetUserInfo));
      if (hasGetUserInfo) {
        // 有用户信息,  并且是已经初始化权限菜单
        if (store.getters.init === false) {
          store.dispatch('menu/GetUserMenu').then(() => {
            // 继承访问目标路由且不会留下history记录
            next({ ...to, replace: true });
          });
        } else {
          // 继承访问目标路由
          next();
        }
      } else {
        window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`;
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`;
    }
  }
});

router.afterEach(() => {
});
