import { dateFormat } from '~/utils/date/date'
import { setStorage } from '~/utils/cache/storage'
const state = {
  logsList: []
}

const mutations = {
  ADD_LOGS(state, { type, message, stack, info }) {
    state.logsList.push(Object.assign({
      url: window.location.href,
      time: dateFormat(new Date())
    }, {
      type,
      message,
      stack,
      info: info.toString()
    }))
    // setStorage('logsList', JSON.stringify(state.logsList));
  },
  CLEAR_LOGS(state) {
    state.logsList = []
    setStorage('logsList', state.logsList)
  }
}

const actions = {
  addErrorLog({ commit }, type) {
    commit('ADD_LOGS', type)
  },
  clearErrorLog({ commit }) {
    commit('CLEAR_LOGS')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
