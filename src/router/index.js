import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

import Home from '../views/home/index.vue';

export const publicRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
        hidden: true,
        meta: {
            title: '登陆',
            icon: 'news'
        }
    },
    {
        path: '/',
        redirect: '/home',
        hidden: true
    },
    {
        path: '/home',
        name: '主页',
        component: Home,
        meta: {
            title: '主页'
        }
    },
    {
        path: '/404',
        component: () => import('../views/404.vue'),
        hidden: true
    }
];

export const asyncRoutes = [
    {
        path: '/admin',
        component: Home,
        redirect: '/admin/page',
        name: 'Admin',
        meta: {
            title: 'Admin',
            icon: '',
            roles: [],
        },
        children: [
            {
                path: 'page',
                component: () => import('../views/admin/page.vue'),
                meta: {
                    title: '',
                    icon: ''
                }
            },
            {
                path: 'a',
                component: () => import('../views/admin/a.vue'),
                meta: {
                    title: '',
                    icon: ''
                }
            }
        ]
    },
    {
        path: '/admin',
        name: 'wwww',
        component: () => import('../views/admin/index.vue'),
        meta: {
            title: 'Role Permission',
            roles: ['admin']
        },
    }
];

export const lastRoute = [{
    path: '*',
    redirect: '/404',
    hidden: true
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
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push;
//修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
   return originalPush.call(this, location);
};

export default router;
