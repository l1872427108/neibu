const state = {
    visitedViews: []
};

const mutations = {
    ADD_VISITED_VIEW: (state, view) => {
        if(state.visitedViews.some(v => v.path === view.path)) return;
        state.visitedViews.path(
            Object.assign({}, view, {
                title: view.meta.title || 'no-name'
            })
        );
    },

    DEL_VISITED_VIEW: (state, view) => {
        for(const [i, v] of state.visitedViews.entries()) {
            if(v.path === view.path) {
                state.visitedViews.splice(i, 1);
                break;
            }
        }
    },


    DEL_ALL_VISITED_VIEWS: state => {
        // keep affix tags
        const affixTags = state.visitedViews.filter(tag => tag.meta.affix);
        state.visitedViews = affixTags;
    },


    UPDATE_VISITED_VIEW: (state, view) => {
        for (let v of state.visitedViews) {
          if (v.path === view.path) {
            v = Object.assign(v, view);
            break;
          }
        }
    }
};

const actions = {
    addView ({ dispatch }, view) {
        dispatch('addVisitedView', view);
    },

    addVisitedView ({ commit }, view) {
        commit('ADD_VISITED_VIEW', view);
    },
    
    delView ({ dispatch, state }, view) {
        return new Promise(resolve => {
          dispatch('delVisitedView', view);
          resolve({
            visitedViews: [...state.visitedViews],
          });
        });
    },

    delVisitedView ({ commit, state }, view) {
        return new Promise(resolve => {
          commit('DEL_VISITED_VIEW', view);
          resolve([...state.visitedViews]);
        });
    },
    delAllViews ({ dispatch, state }, view) {
        return new Promise(resolve => {
          dispatch('delAllVisitedViews', view);
          resolve({
            visitedViews: [...state.visitedViews],
          });
        });
    },
    delAllVisitedViews ({ commit, state }) {
        return new Promise(resolve => {
            commit('DEL_ALL_VISITED_VIEWS');
            resolve([...state.visitedViews]);
        });
    },

    updateVisitedView ({ commit }, view) {
        commit('UPDATE_VISITED_VIEW', view);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};