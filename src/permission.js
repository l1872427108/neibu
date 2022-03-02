import router from './router';
import {
  Cookie,
  Key
} from './utils/cache/cookie';
import store from './store';
import Nprogress from 'nprogress';
import 'nprogress/nprogress.css';
import { progressBar } from '~/setting';
import { whiteList, pendingXHRMap } from '~/config/website';
import { useTitle } from './utils/load/setWebTitle';

Nprogress.configure({
  easing: 'ease',
  speed: 500,
  trickleSpeed: 200,
  showSpinner: false
});

router.beforeEach(async (to, from, next) => {
  // pendingXHRMap.forEach((cancel) => {
  //   cancel();
  // });
  // pendingXHRMap.clear();
  if (progressBar) Nprogress.start();
  const hasToken = Cookie.get(Key.accessTokenKey);
  console.log('hasToken', hasToken);
  if (hasToken) {
      const hasGetUserInfo = Cookie.get(Key.userInfoKey);
      if (hasGetUserInfo) {
        // 有用户信息,  并且是已经初始化权限菜单
        if (store.getters.init === false) {
          try {
            await store.dispatch('menu/GetUserMenu');
              // 继承访问目标路由且不会留下history记录
              next({ ...to, replace: true });
          } catch {
            if (progressBar) Nprogress.done();
          }
        } else {
          // 继承访问目标路由
          next();
        }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      if (progressBar) Nprogress.done();
      window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`;
    }
  }
  // document.title = getPageTitle(to.meta.title);
  document.title = useTitle(to.meta.title);
});

router.afterEach(() => {
  if (progressBar) Nprogress.done();
});
