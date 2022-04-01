const getters = {
  token: state => state.user.token,
  roles: state => state.user.roles,
  routes: state => state.permission.routes,
  logsList: state => state.logs.logsList,
  colorName: state => state.common.colorName,
  language: state => state.common.language,
  isCollapse: state => state.common.isCollapse,
  isFullScren: state => state.common.isFullScren,
  themeName: state => state.common.themeName,
  visitedViews: state => state.tagsView.visitedViews,

  // 菜单按钮权限
  init: state => state.menu.init,
  menuList: state => state.menu.menuList,
  buttonList: state => state.menu.buttonList,

  userInfo: state => state.menu.userInfo,

  themeConfig: state => state.themeConfig.themeConfig
}

export default getters
