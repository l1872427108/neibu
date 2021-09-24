import { Cookie, Key } from '~/utils/cookie';
import { pugesystem, pugemenu } from '~/api/menuRole';
import { Message } from 'element-ui';

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
    }
};

const actions = {
    // 获取用户菜单。
    GetUserMenu ({ commit }) {
        return new Promise((resolve, reject) => {
            const userId = Cookie.get(Key.userInfoKey) ? JSON.parse(JSON.stringify(Cookie.get(Key.userInfoKey))) : null;
            if (userId) {
                pugesystem(JSON.parse(userId).uid).then(res => {
                    const system = res.data.list.some((item) => item === '66');
                    if (!system) {
                        Message({ type: 'error', message: '您没有系统权限' });
                        window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`;
                    } else {
                        pugemenu(JSON.parse(userId).uid, '66').then(res => {
                            commit('SET_SYSTEM_MENU', res.data.date.menyTreeList);
                            resolve();
                        }).catch((err) => {
                            reject(err);
                        });
                    }
                });
            }
        });
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
