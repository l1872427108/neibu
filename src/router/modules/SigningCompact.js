/* Layout */
import Layout from '~/views/layout';

const compactRouter = {
    path: '/compact',
    component: Layout,
    redirect: '/compact/management',
    name: 'Compact',
    meta: {
        title: '签约合同',
        icon: 'basic-icon-home'
    },
    children: [
        {
            path: 'management',
            name: 'Management',
            component: () => import('~/views/ManagementContract/index'),
            meta: {
                title: '合同管理',
                icon: 'basic-icon-maoshachan',
                keepAlive: true
            }
        }
    ]
};

export default compactRouter;
