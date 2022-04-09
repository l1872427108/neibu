import Vue from 'vue'
import App from '~/App.vue'
import router from '~/router'
import store from '~/store'
import i18n from '~/i18n'
import '~/styles/index.scss'
import '~/permission'
import '~/directives'
import '~/plugins/element'

import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999
  }
})
Vue.config.productionTip = false

Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
