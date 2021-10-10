<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import setExecuteFun from './utils/setLoadUrl';
export default {
  name: 'App',

  mounted () {
    // 初始化
    this.init();
  },

  methods: {
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
