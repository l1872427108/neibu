/* Layout */
import Layout from '~/views/layout';

const fileRouter = {
    path: '/file',
    component: Layout,
    redirect: 'file/sharedFile',
    name: 'File',
    meta: {
        title: 'router.file'
    },
    children: [
        {
            path: 'sharedfile',
            name: 'Sharedfile',
            component: () => import(/* webpackChunkName:"interview" */'~/views/SharedFile/file'),
            meta: {
                title: '共享文件',
                keepAlive: true
            }
        },
        {
            path: 'collection',
            name: 'Collection',
            component: () => import(/* webpackChunkName:"interview" */'~/views/SharedFile/collection'),
            meta: {
                title: '我的收藏',
                keepAlive: true
            }
        }
    ]
};
export default fileRouter;
