import { setStorage, getStorage } from '~/utils/cache/storage'
import { key } from '~/config/website'
const state = {
  language: getStorage(key + '-language') || 'zh',
  colorName: getStorage(key + '-themeName') || 'theme-default',
  isCollapse: false, // 是否折叠
  isFullScren: false,
  themeName: getStorage(key + '-themeName') || 'theme-default'
}

const mutations = {
  SET_LANGUAGE(state, language) {
    console.log(language)
    setStorage('language', state.language)
    state.language = language
  },
  SET_COLOR_NAME: (state, colorName) => {
    state.colorName = colorName
    setStorage('colorName', state.colorName)
  },

  SET_COLLAPSE: (state) => {
    state.isCollapse = !state.isCollapse
  },

  SET_FULLSCREN: (state) => {
    state.isFullScren = !state.isFullScren
  },
  SET_THEME_NAME: (state, themeName) => {
    state.themeName = themeName
    setStorage('themeName', state.themeName)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
