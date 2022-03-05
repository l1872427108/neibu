import { Cookie, Key } from '~/utils/cache/cookie';
import { pugesystem, pugemenu } from '~/api/systemMenuRole';
import { Message } from 'element-ui';
import { sleep } from '~/utils/util';

const state = {
    init: false, // 是否已经加载了用户菜单
    menuList: [], // 用户拥有的菜单集合。
    buttonList: [], // 页面拥有的菜单权限集合
    userInfo: Cookie.get(Key.userInfoKey) ? JSON.parse(Cookie.get(Key.userInfoKey)) : null
};

const mutations = {
    SET_SYSTEM_MENU: (state, data) => {
        state.init = true;
        state.menuList = data.menyTreeList;
        state.buttonList = data.buttonList;
    }
};

const actions = {
    // 获取用户菜单。
    GetUserMenu ({ commit }) {
        return new Promise((resolve, reject) => {
            const userId = Cookie.get(Key.userInfoKey) ? JSON.parse(JSON.stringify(Cookie.get(Key.userInfoKey))) : null;
            console.log('userId', userId);
            if (userId) {
                pugesystem(JSON.parse(userId).uid).then(async res => {
                    const system = res.data.list.some((item) => item === '66');
                    if (!system) {
                        Message({
                            message: '您没有该系统权限',
                            type: 'error',
                            duration: 3 * 1000
                        });
                        await sleep(1000);
                        window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`;
                    }
                        pugemenu(JSON.parse(userId).uid, '66').then(async res => {
                            if (res.data?.date?.menyTreeList && res.data.date.menyTreeList.length !== 0) {
                                res.data.date.menyTreeList.sort((a, b) => {
                                    return a.sort - b.sort;
                                });
                                commit('SET_SYSTEM_MENU', res.data.date);
                                resolve();
                            } else {
                                Message({
                                    message: '您没有权限',
                                    type: 'error',
                                    duration: 3 * 1000
                                });
                                await sleep(1000);
                                window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`;
                            }
                        }).catch((err) => {
                            reject(err);
                        });
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
