import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Layout from '../views/layout';

export const publicRoutes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/login'),
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
            title: '首页',
            icon: 'basic-icon-username',
        },
        children: [
            {
                path: 'page',
                component: () => import('../views/page/index'),
                name: 'page1',
                meta: {
                    title: '第一页',
                    icon: 'basic-icon-username',
                    affix: true,
                    keepAlive: true,
                    activeMenu: '/page'
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
            title: '公共',
            icon: 'basic-icon-username',
        },
        children: [
            {
                path: 'wc',
                component: () => import('../views/public/index'),
                name: 'wc1',
                meta: {

                    title: '公共',
                    icon: 'basic-icon-tubiao',
                    // affix: true
                    keepAlive: true
                }
            }
        ]
    },
    {
        path: '/404',
        component: () => import('../views/err-page/404'),
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
            title: '公共',
            icon: 'basic-icon-username',
        },
        children: [
            {
                path: 'ww',
                component: () => import('../views/admin/index'),
                name: 'shoe',
                meta: {
                    title: '公共',
                    roles: ['admin'],
                    icon: 'basic-icon-tubiao',
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

const createRouter = () => new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes: publicRoutes,
    mode: 'history'
});

const router = createRouter();

export const resetRouter = () => {
    const newRouter = createRouter();
    router.matcher = newRouter.matcher;   // reset router
};

// const VueRouterPush = router.prototype.push
// router.prototype.push = function push (to) {

//     return VueRouterPush.call(this, to).catch(err => err)

// }

const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push (to) {
  return VueRouterPush.call(this, to).catch(err => err);
};

//获取原型对象上的push函数
// const originalPush = VueRouter.prototype.push;
// //修改原型对象中的push方法
// VueRouter.prototype.push = function push (location) {
//    return originalPush.call(this, location);
// };

export default router;
