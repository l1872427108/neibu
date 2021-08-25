const getters = {
    token: state => state.user.token,
    roles: state => state.user.roles,
    routes: state => state.permission.routes,
    colorName: state => state.common.colorName,
    language: state => state.common.language
};

export default getters;
