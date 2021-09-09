import {
    Cookie,
    Key
} from '~/utils/cookie';

const state = {
    init: true, // 是否已加载用户菜单
    menuList: [], // 用户拥有的菜单集合
    buttonList: [] // 拥有按钮权限集合
};

const mutations = {
    SET_SYSTEM_MENU: (state, data) => {
        state.init = true;
        state.menuList = data.menuTreeList;
        state.buttonList = data.buttonTreeList;
    }
};

const actions = {
    // 获取用户菜单
    GetUserMenu ({ commit }) {
        return new Promise((resolve, reject) => {
            // 获取用户id
            const userId = Cookie.get(Key.userInfoKey) ? JSON.parse(Cookie.get(Key.userInfoKey)).uid
            : null;
            console.log(userId);
            // if (userId) {
                // getUserMenuList(userId).then(response => {
                //     //
                //     commit('SET_SYSTEM_MENU', response.data);
                //     resolve();
                // }).catch(error => {
                //     reject(error);
                // });
            // }
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
