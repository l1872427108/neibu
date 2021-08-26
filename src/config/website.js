export default {
    // 名字
    title: "后台",

    // 
    indexTitle: "Admin",

    // 配置首页不可以关闭
    isFirstPage: false,

    // 配置首页
    fistPage: {
        label: '首页',
        path: '/home/index',
        params: {},
        query: {},
        meta: {},
        group: [],
        close: false
    },

    // 配置存储的key
    key: 'p', 

    captchaMode: true,
    
    authUrl: 'http://localhost:8081'
};