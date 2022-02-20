import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Layout from '~/views/layout';
import payRouter from './modules/UnifiedPayment';
import compactRouter from './modules/SigningCompact';
import { routerMode } from '~/config/website';
import interviewRouter from './modules/SigningInterview';

export const publicRoutes = [
    {
        path: '/contract',
        name: 'Contract',
        component: () => import('~/views/SigningContract'),
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
                    title: 'router.welcome',
                    affix: true
                }
            },
            {
                path: '/applyReimbursement',
                name: 'applyReimbursement',
                component: () => import('~/views/applyReimbursement'),
                meta: {
                    title: '财务报销',
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
            title: 'router.setting'
        },
        children: [
            {
                path: 'personage',
                component: () => import('~/views/Account'),
                name: 'Personage',
                meta: {
                    title: 'router.personage'
                }
            }
        ]
    },
    payRouter,
    compactRouter,
    interviewRouter,
    {
        path: '/401',
        name: '401',
        component: () => import('~/views/ErrPage/401')
    },
    {
        path: '/404',
        name: '404',
        component: () => import('~/views/ErrPage/404')
    },
    { path: '*', redirect: '/404' }
];

const createRouter = () => new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: publicRoutes,
    mode: routerMode
});

const router = createRouter();

export const resetRouter = () => {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher; // reset router
};

const RouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
    return RouterPush.call(this, to).catch(err => err);
};

export default router;
