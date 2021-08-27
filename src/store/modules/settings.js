import setting from '~/setting';

const state = {
    ...setting,
    // 侧边栏是否收起  pc 模式下
    sidebarCollapseLastStatus: setting.sidebarCollapse,
    // 模式
    mode: 'pc'
};

export default {
    namespaced: true,
    state
};
