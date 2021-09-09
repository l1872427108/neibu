import { login, getInfo, logout } from '~/api/user';
import { setToken, getToken, removeToken } from '~/utils/auth';
import router, { resetRouter } from '~/router';

const state = {
    token: getToken('Admin-Token'),
    roles: []
};

const mutations = {
    SET_TOKEN: (state, token) => {
        state.token = token;
    },
    SET_ROLES: (state, roles) => {
        state.roles = roles;
    },
    SET_USER_STATE (state, data) {

    }
    // 重置用户状
};

const actions = {
    login ({ commit }, user) {
        const { username, password } = user;
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then((response) => {
                const { data } = response;
                commit('SET_TOKEN', data.token);
                setToken(data.token);
                resolve();
            }).catch(error => {
                reject(error);
            });
        });
    },
    getInfo ({ commit, state }) {
        return new Promise((resolve, reject) => {
            getInfo(state.token).then(response => {
                const { data } = response;
                if (!data) {
                    reject('Verification failed, please Login again.');
                }
                const { roles } = data;
                if (!roles || roles.length <= 0) {
                    reject('roles must be a non-null array!');
                }
                commit('SET_ROLES', roles);
                resolve(data);
            }).catch(error => {
                reject(error);
            });
        });
    },
    logout ({ commit, state, dispatch }) {
        return new Promise((resolve, reject) => {
          logout(state.token).then(() => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            // removeToken();
            // 然后要重置
            resetRouter();
            resolve();
          }).catch(error => {
            reject(error);
          });
        });
    },

    resetToken ({ commit }) {
        return new Promise(resolve => {
            commit('SET_TOKEN', '');
            commit('SET_ROLES', []);
            // removeToken();
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
