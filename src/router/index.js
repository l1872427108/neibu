import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const publicRoutes = [
    {
        path: '/login',
        component: () => import('../views/login/index.vue'),
    },
    {
        path: '/',
        component: () => import('../views/public/index.vue'),
    }
];

export const asyncRoutes = [
    {
        path: '/admin',
        component: () => import('../views/admin/index.vue'),
        meta: {
            title: 'Role Permission',
            roles: ['admin']
        },
    }
];

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
