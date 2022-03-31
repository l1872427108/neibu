import Vue from 'vue'
import store from '~/store'
import i18n from '~/i18n'
export const useTitle = (to) => {
  Vue.nextTick(() => {
    document.title = `${i18n.t(to)}-${i18n.t(`router.${store.state.themeConfig.themeConfig.globalTitle}`)}`
  })
}
