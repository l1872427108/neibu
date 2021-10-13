/* Layout */
import Layout from '~/views/layout';

const interviewRouter = {
    path: '/interview',
    component: Layout,
    redirect: '/interview/sign',
    name: 'Interview',
    meta: {
        title: 'router.interview'
    },
    children: [
        {
            path: 'sign',
            name: 'Sign',
            component: () => import('~/views/SigningInterview/sign'),
            meta: {
                title: 'router.sign',
                keepAlive: true
            }
        },
        {
            path: 'progress',
            name: 'Progress',
            component: () => import('~/views/SigningInterview/interview'),
            meta: {
                keepAlive: true,
                title: 'router.progress'
            }
        }
    ]
};

export default interviewRouter;
