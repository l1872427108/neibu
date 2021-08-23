<template>
  <div id="app">
    <!-- <top-bar /> -->
    <div class="main">
      <!-- <nav-bar /> -->
      <keep-alive v-if="getKeepAlive">
        <router-view
          class="router-view"
        />
      </keep-alive>
      <router-view
        v-else
        class="router-view"
      />
    </div>
  </div>
</template>

<script>
// import NavBar from './views/nav/TopBar.vue';
export default {

  // components: {
  //   NavBar,
  // },

  data () {
    return {
      value: new Date()
    };
  },

  computed: {
    getKeepAlive: {
      get () {
        return this.$route.meta.keepAlive;
      }
    }
  },

  mounted () {
    
  },

  methods: {
    btn () {
      this.$alert('这是一段内容', '标题名称', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
    }
  }

};
</script>

<style lang="scss" scoped>
#app {
  position: relative;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  /* background: $color-bgc-theme; */
  .main {
    display: flex;
    overflow: hidden;
    flex: 1;
  }
  .router-view {
    flex: 1;
    display: flex;
    overflow: hidden;
    flex-direction: column;
  }
}
</style>
