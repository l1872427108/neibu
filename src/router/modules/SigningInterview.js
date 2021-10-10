/* Layout */
import Layout from '~/views/layout';

const interviewRouter = {
    path: '/interview',
    component: Layout,
    redirect: '/interview/sign',
    name: 'Interview',
    children: [
        {
            path: 'sign',
            name: 'Sign',
            component: () => import('~/views/SigningInterview/sign'),
            meta: {
                title: '报名通道',
                keepAlive: true
            }
        },
        {
            path: 'progress',
            name: 'Progress',
            component: () => import('~/views/SigningInterview/interview'),
            meta: {
                keepAlive: true,
                title: '面试进度'
            }
        }
    ]
};

export default interviewRouter;
