module.exports = {
  // 配置存储的key
  key: 'pg',
  // 不经验证放行的白名单
  whiteList: ['/login', '/404', '/401'],
  // 配后端数据的接收方式application/json;charset=UTF-8或者application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  // 过滤不需要加载动画的请求
  needLoadingRequest: [],
  // 消息框消失的时间
  messageDuration: 3000,
  // 请求时间超时时间
  requestTimeout: 100000,
  // 加载动画显示的文字
  loadingText: '正在加载中...',
  // 开发环境端口
  devPort: '80',
  // 开发以及部署的URL
  publicPath: '',
  // 生产环境构建文件的目录名
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'static',
  // 开发环境每次保存时是否输出为eslint编译警告
  lintOnSave: true,
  // 路由模式
  routerMode: 'hash',
  // 是否取消重复请求开关
  requestCancelSwitch: true,
  // 定义错误类型
  CANCEL_REQUEST_TYPE: 'ErrorRequest',
  // 存放请求map数组
  pendingXHRMap: new Map(),
  // 异步加载的时间
  asyncCount: 10
}
