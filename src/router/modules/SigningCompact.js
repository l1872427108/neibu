/* Layout */
import Layout from '~/views/layout'

const compactRouter = {
  path: '/compact',
  component: Layout,
  redirect: '/compact/management',
  name: 'Compact',
  meta: {
    title: 'router.compact',
    icon: 'basic-icon-home'
  },
  children: [
    {
      path: 'management',
      name: 'Management',
      component: () => import(/* webpackChunkName:"content" */'~/views/ManagementContract/index'),
      meta: {
        title: 'router.management',
        icon: 'basic-icon-maoshachan',
        keepAlive: true
      }
    }
  ]
}

export default compactRouter
