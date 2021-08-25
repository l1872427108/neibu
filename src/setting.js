let globalSettings = {
    /**
     * 是否开启权限
     * 1. 路由权限
     * 2. 权限组件
     * 3. 权限指令
     * 4. 权限函数
     */
    openPermission: true,
    // 是否显示头部
    showHeader: false,
    // 是否开启侧边栏展开收起按钮
    enableSidebarCollapse: false,
    // 侧边栏是否收起
    sidebarCollapse: false,
    // 是否显示底部版权信息，同时在路由 meta 对象里可以单独设置某个路由是否显示底部版权信息
    showCopyright: true,
    // 版权信息配置，格式为：Copyright © [dates] <company>
    copyrightDates: '2021',
    copyrightCompany: 'Fantastic-admin',
    copyrightWebsite: 'https://hooray.github.io/fantastic-admin',
    // 是否开启全屏
    enableFullscreen: false,
};

export default globalSettings;