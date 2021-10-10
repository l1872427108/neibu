<template>
  <el-menu
        :collapse="setIsCollapse"
        background-color="transparent"
        :unique-opened="true"
        :collapse-transition="false"
        :default-active="defaultActive"
      >
        <sidebar-item
          v-for="menu in menuList"
          :key="menu.id"
          :item="menu"
        />
    </el-menu>
</template>

<script>
import SidebarItem from '../sidebarItem.vue';
export default {
  components: { SidebarItem },
  props: {
    menuList: {
        type: Array,
        default () {
            return [];
        }
    }
  },
  data () {
    return {
        defaultActive: this.$route.path
    };
  },
  computed: {
    setIsCollapse () {
        return document.body.clientWidth < 1000 ? false : this.$store.state.themeConfig.themeConfig.isCollapse;
    }
  },
  watch: {
    $route: {
      handler (to) {
        console.log(this.$store.state.themeConfig.themeConfig.isCollapse);
        this.defaultActive = to.path;
        const clientWidth = document.body.clientWidth;
        if (clientWidth < 1000) this.$store.state.themeConfig.themeConfig.isCollapse = false;
      },
      deep: true
    }
  }
};
</script>

<style>

</style>
