<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import setExecuteFun from '~/utils/load/setLoadUrl'
import { setStorage, getStorage } from '~/utils/cache/storage'
import { key } from '~/config/website'
export default {
  name: 'App',
  mounted() {
    this.init()
    this.initThemeConfig()
  },

  methods: {
    /**
     * 初始化主题配置项
     */
    initThemeConfig() {
      if (getStorage(key + '-language')) {
        this.$store.commit('common/SET_LANGUAGE', getStorage(key + '-language'))
      } else {
        setStorage('language', this.$store.state.common.language)
      }
      this.$i18n.locale = this.$store.state.common.language
    },
    /**
     * 加载第三方文件
     */
    init() {
      // icon 图标
      setExecuteFun.cssCdn()
      // js 第三方
      // setExecuteFun.jsCdn();
    }
  }
}
</script>
<style lang="scss">
</style>
