import router, { lastRoute } from './router';
import store from './store';
import { Message } from 'element-ui';

import { getToken } from '~/utils/auth';

const whiteList = ['/login'];

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken();
  console.log(hasToken);
  if (hasToken) {
    if (to.path === '/login') {
      next({ path: '/' });
    } else {
      const hasRoles = store.getters.roles && store.getters.roles.length > 0;
      if (hasRoles) {
        next();
      } else {
        try {
          const { roles } = await store.dispatch('user/getInfo');
          const accessRoutes = await store.dispatch('permission/generateRoutes', roles);
          accessRoutes.forEach(v => {
            router.addRoute({ ...v, ...lastRoute });
          });
          next({ ...to, replace: true });
        } catch (error) {
          await store.dispatch('user/resetToken');
          Message.error(error || 'Has Error');
          next('/login');
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
    } else {
      next('/login');
    }
  }
});

router.afterEach(() => {
});
