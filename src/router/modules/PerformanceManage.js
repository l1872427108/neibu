/* Layout */
import Layout from '~/views/layout'

const performanceRouter = {
  path: '/performance',
  component: Layout,
  redirect: '/performance/declare',
  name: 'performance',
  meta: {
    title: 'router.performance',
    icon: 'basic-icon-data'
  },
  children: [
    {
      path: 'declare',
      name: 'declare',
      component: () => import(/* webpackChunkName:"content" */'~/views/ManagementPerformance'),
      meta: {
        title: 'router.declare',
        icon: 'basic-icon-marketing',
        keepAlive: true
      }
    },
    {
      path: 'approve',
      name: 'approve',
      component: () => import(/* webpackChunkName:"content" */'~/views/ManagementPerformance/approve'),
      meta: {
        title: 'router.approve',
        icon: 'basic-icon-marketing',
        keepAlive: true
      }
    },
    {
      path: 'ranking',
      name: 'ranking',
      component: () => import(/* webpackChunkName:"content" */'~/views/ManagementPerformance/ranking'),
      meta: {
        title: 'router.ranking',
        icon: 'basic-icon-marketing',
        keepAlive: true
      }
    }
  ]
}

export default performanceRouter
