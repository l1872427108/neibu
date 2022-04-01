import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Layout from '~/views/layout'
import payRouter from './modules/UnifiedPayment'
import compactRouter from './modules/SigningCompact'
import { routerMode } from '~/config/website'
export const publicRoutes = [
  {
    path: '/contract',
    name: 'Contract',
    component: () => import(/* webpackChunkName:"signing" */'~/views/SigningContract'),
    meta: {
      title: '合同',
      keepAlive: true
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
        component: () => import(/* webpackChunkName:"welcome" */'~/views/welcome'),
        meta: {
          title: 'router.welcome',
          affix: true,
          keepAlive: false
        }
      },
      {
        path: '/applyReimbursement',
        name: 'applyReimbursement',
        component: () => import(/* webpackChunkName:"applyReimbursement" */'~/views/applyReimbursement'),
        meta: {
          title: 'router.applyReimbursement',
          keepAlive: true
        }
      },
      {
        path: '/interview',
        name: 'Interview',
        component: () => import(/* webpackChunkName:"interview" */'~/views/SigningInterview/interview'),
        meta: {
          title: 'router.sign',
          keepAlive: true
        }
      },
      {
        path: '/task',
        name: 'Task',
        component: () => import(/* webpackChunkName:"interview" */'~/views/TaskCenter/mission'),
        meta: {
          title: 'router.task',
          keepAlive: true
        }
      }
    ]
  },
  payRouter,
  compactRouter,
  {
    path: '/401',
    name: '401',
    component: () => import(/* webpackChunkName:"welcome" */'~/views/ErrPage/401')
  },
  {
    path: '/404',
    name: '404',
    component: () => import(/* webpackChunkName:"welcome" */'~/views/ErrPage/404')
  },
  { path: '*', redirect: '/404' }
]

const createRouter = () => new VueRouter({
  scrollBehavior: () => ({ y: 0 }),
  routes: publicRoutes,
  mode: routerMode
})

const router = createRouter()

export const resetRouter = () => {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

const RouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(to) {
  return RouterPush.call(this, to).catch(err => err)
}

export default router
