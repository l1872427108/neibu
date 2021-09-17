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
        path: '/pdf',
        name: 'Pdf',
        component: () => import('~/views/pdf'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/welcome',
        children: [
            {
                path: 'welcome',
                name: 'Welcome',
                component: () => import('~/views/welcome'),
                meta: {
                    title: '首页',
                    icon: 'basic-icon-home',
                    affix: true,
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: '/setting',
        component: Layout,
        redirect: '/setting/account',
        name: 'Setting',
        meta: {
            title: '个人设置',
            icon: 'basic-icon-home'
        },
        children: [
            {
                path: 'account',
                component: () => import('~/views/account'),
                name: 'Account',
                meta: {
                    title: '账号信息',
                    icon: 'basic-icon-maoshachan',
                    keepAlive: true
                }
            },
            {
                path: 'personage',
                component: () => import('~/views/personage'),
                name: 'Personage',
                meta: {
                    title: '个人信息',
                    icon: 'basic-icon-maoshachan',
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: '/compact',
        component: Layout,
        redirect: '/compact/management',
        name: 'Compact',
        meta: {
            title: '签约合同',
            icon: 'basic-icon-home'
        },
        children: [
            {
                path: 'management',
                name: 'Management',
                component: () => import('~/views/management/index'),
                meta: {
                    title: '合同管理',
                    icon: 'basic-icon-maoshachan',
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('~/views/err-page/404'),
        hidden: true
    },
    { path: '*', redirect: '/404', hidden: true }
];

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
