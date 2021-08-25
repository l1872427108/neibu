import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export const publicRoutes = [
    {
        path: '/login',
        name: 'login',
        component: () => import('../views/login/index.vue'),
        meta: {
            // 在侧边栏和导航中的标题。
            title: '登陆',
            // 国际化key, key不显示才是title
            i18n: '',
            // 侧边栏中显示的图标
            icon: 'news',
            // 侧边栏捣烂中激活时显示的图标
            activeIcon: '',
            // 是否显示在侧边栏中
            sidebar: false,
            // 是否显示在面包屑导航中
            breadcrumb: false
        }
    },
    {
        path: '/',
        component: () => import('../views/public/index.vue'),
    }
];
// () => import()
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

export const lastRoute = [{
    path: '*',
    component: () => import('../views/404.vue'),
    meta: {
        title: '404',
        sidebar: false
    }
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
