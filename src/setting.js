const globalSettings = {
    // 是否开启侧边栏展开收起按钮
    enableSidebarCollapse: false,
    // 侧边栏是否收起
    sidebarCollapse: false,
    // 是否开启全屏
    enableFullscreen: false,
    // 标题
    title: '普歌人事系统',
    // 线上环境开启错误日志
    errorLog: 'production',
    // 是否显示换色
    showColor: true,
    // 是否显示bug
    showDebug: true,
    // 是否显示主题
    showTheme: true,
    // 是否显示全屏
    showFullScren: true,
    // 是否显示顶部进度条
    progressBar: true,
    // 不经验证放行的白名单
    whiteList: ['/login', '/404', '/401'],
    // 当前路由地址url
    currentAddressUrl: window.location.href,
    // 配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
    contentType: 'application/json;charset=UTF-8',
    // 过滤不需要加载动画的请求
    needLoadingRequest: [],
    // 消息框消失的时间
    messageDuration: 3000,
    // 请求时间超时时间
    requestTimeout: 100000,
    // 加载动画显示的文字
    loadingText: '正在加载中...'
};

export default globalSettings;
