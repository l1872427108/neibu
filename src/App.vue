<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import setExecuteFun from '~/utils/load/setLoadUrl';
import { setStorage, getStorage } from '~/utils/cache/storage';
import { key } from '~/config/website';
export default {
  name: 'App',

  mounted () {
    // 初始化
    this.init();
    this.initThemeConfig();
  },

  methods: {
    initThemeConfig () {
      if (getStorage(key + '-language')) {
        this.$store.commit('common/SET_LANGUAGE', getStorage(key + '-language'));
      } else {
        setStorage('language', this.$store.state.common.language);
      }
        this.$i18n.locale = this.$store.state.common.language;
    },
    init () {
      // icon 图标
      setExecuteFun.cssCdn();
      // js 第三方
      setExecuteFun.jsCdn();
    }
  }
};
</script>
<style lang="scss">
</style>
