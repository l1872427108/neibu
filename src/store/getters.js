const getters = {
    token: state => state.user.token,
    roles: state => state.user.roles,
    routes: state => state.permission.routes,
    colorName: state => state.common.colorName,
    language: state => state.common.language,
    isCollapse: state => state.common.isCollapse,
    isFullScren: state => state.common.isFullScren,
    themeName: state => state.common.themeName
};

export default getters;
