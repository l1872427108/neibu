/* Layout */
import Layout from '~/views/layout';

const payRouter = {
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
            component: () => import('~/views/UnifiedPayment/index'),
            meta: {
                title: '支付中心',
                icon: 'basic-icon-maoshachan',
                keepAlive: true
            }
        }
    ]
};

export default payRouter;
