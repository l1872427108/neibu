/* Layout */
import Layout from '~/views/layout'

const payRouter = {
  path: '/pay',
  component: Layout,
  redirect: '/pay/center',
  name: 'Pay',
  meta: {
    title: 'router.pay',
    icon: 'basic-icon-home'
  },
  children: [
    {
      path: 'center',
      name: 'Centre',
      component: () => import(/* webpackChunkName:"UnifiedPayment" */'~/views/UnifiedPayment/index'),
      meta: {
        title: 'router.center',
        icon: 'basic-icon-maoshachan',
        keepAlive: true
      }
    }
  ]
}

export default payRouter
