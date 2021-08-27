import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

import Layout from '~/views/layout';

export const publicRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('~/views/login'),
        hidden: true,
        meta: {
            title: '登陆'
        }
    },
    {
        path: '/',
        component: Layout,
        redirect: '/page',
        name: 'Page',
        meta: {
            title: 'home',
            icon: 'basic-icon-home'
        },
        children: [
            {
                path: 'page',
                component: () => import('~/views/page'),
                name: 'page1',
                meta: {
                    title: '主页',
                    icon: 'basic-icon-maoshachan',
                    affix: true,
                    keepAlive: true,
                    activeMenu: 'Page'
                }
            }
        ]
    },
    {
        path: '/public',
        component: Layout,
        name: 'Public',
        redirect: '/public/wc',
        meta: {
            title: 'public',
            icon: 'basic-icon-tubiao'
        },
        children: [
            {
                path: 'wc',
                component: () => import('~/views/public/index'),
                name: 'wc1',
                meta: {

                    title: '公共',
                    icon: 'basic-icon-xiyu',
                    // affix: true
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('~/views/err-page/404'),
        hidden: true
    }
];

export const asyncRoutes = [
    {
        path: '/admin',
        component: Layout,
        name: 'Admin',
        redirect: '/admin/ww',
        meta: {
            title: 'admin',
            icon: 'basic-icon-yanzhengma'
        },
        children: [
            {
                path: 'ww',
                component: () => import('~/views/admin/index'),
                name: 'shoe',
                meta: {
                    title: '公共',
                    roles: ['admin'],
                    icon: 'basic-icon-password',
                    // affix: true
                    keepAlive: true
                }
            }
        ]
    }
];

export const lastRoute = [{
    path: '*',
    redirect: '/404',
    hidden: true,
    keepAlive: true
}];

const createRouter = () => new Router({
    scrollBehavior: () => ({ y: 0 }),
    routes: publicRoutes,
    mode: 'history'
});

const router = createRouter();

export const resetRouter = () => {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
};

const RouterPush = Router.prototype.push;
Router.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err);
};

export default router;
