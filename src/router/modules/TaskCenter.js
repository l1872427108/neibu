/* Layout */
import Layout from '~/views/layout';

const taskRouter = {
    path: '/task',
    component: Layout,
    redirect: 'task/mission',
    name: 'Task',
    meta: {
        title: 'router.task'
    },
    children: [
        {
            path: 'mission',
            name: 'Mission',
            component: () => import(/* webpackChunkName:"interview" */'~/views/TaskCenter/mission'),
            meta: {
                title: '每日任务',
                keepAlive: true
            }
        }
    ]
};
export default taskRouter;
