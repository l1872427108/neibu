import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Layout from '~/views/layout';

export const publicRoutes = [
    {
        path: '/contract',
        name: 'Contract',
        component: () => import('~/views/pdf'),
        meta: {
            title: '合同'
        }
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
                    title: '首页'
                }
            }
        ]
    },

    {
        path: '/setting',
        component: Layout,
        redirect: '/setting/personage',
        name: 'Setting',
        meta: {
            title: '个人中心'
        },
        children: [
            {
                path: 'personage',
                component: () => import('~/views/personage'),
                name: 'Personage',
                meta: {
                    title: '个人信息'
                }
            }
        ]
    },
    {
        path: '/pay',
        component: Layout,
        redirect: '/pay/center',
        name: 'Pay',
        meta: {
            title: '支付',
            icon: 'basic-icon-home'
        },
        children: [
            {
                path: 'center',
                name: 'Centre',
                component: () => import('~/views/pay/index'),
                meta: {
                    title: '支付中心',
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

const createRouter = () => new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: publicRoutes,
    mode: 'hash'
});

const router = createRouter();

export const resetRouter = () => {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
};

const RouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (to) {
  return RouterPush.call(this, to).catch(err => err);
};

export default router;
