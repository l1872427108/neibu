import { Cookie, Key } from '~/utils/cookie';
import { menuSearch } from '~/api/menuRole';

const state = {
    init: false, // 是否已经加载了用户菜单
    menuList: [], // 用户拥有的菜单集合。
    buttonList: [], // 页面拥有的菜单权限集合
    userInfo: Cookie.get(Key.userInfoKey) ? JSON.parse(Cookie.get(Key.userInfoKey)) : null
};

const mutations = {
    SET_SYSTEM_MENU: (state, data) => {
        state.init = true;
        state.menuList = data;
    },

    SET_SYSTEM_INFO: (state, data) => {
        state.userInfo = JSON.parse(data);
    },

    SET_SYSTEM_CLEAR: (state) => {
        state.userInfo = null;
        Cookie.remove(Key.userInfoKey);
        Cookie.remove(Key.accessTokenKey);
        Cookie.remove(Key.refreshTokenKey);
    }
};

const actions = {
    // 获取用户菜单。
    GetUserMenu ({ commit }) {
        return new Promise((resolve, reject) => {
            // 要想获取用户菜单，就需要先判断用户是否已经存在。
            const userId = Cookie.get(Key.userInfoKey) ? JSON.parse(JSON.stringify(Cookie.get(Key.userInfoKey))) : null;
            if (userId) {
                commit('SET_SYSTEM_INFO', userId);
                menuSearch({ current: 1, size: 20 }).then(res => {
                    commit('SET_SYSTEM_MENU', res.data.menus.systemCTree);
                    resolve();
                }).catch((err) => {
                    reject(err);
                });
            }
        });
    },

    logout ({ commit }) {
        return new Promise((resolve, reject) => {
            commit('SET_SYSTEM_CLEAR');
            resolve();
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
