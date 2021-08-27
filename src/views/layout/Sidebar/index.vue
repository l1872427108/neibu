<template>
  <div class="sidebar-container">
    <!-- <logo /> -->
    <el-scrollbar
      wrap-class="scrollbar-wrapper"
    >
      <el-menu
        :text-color="variables.menuText"
        :background-color="variables.menuBg"
        :unique-opened="true"
        :active-text-color="variables.menuActiveText"
        mode="vertical"
        :collapse-transition="false"
        :collapse="isCollapse"
        :router="true"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          class="nest-menu"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import SidebarItem from './sidebarItem.vue';
import variables from '~/assets/styles/variable.scss';
// import logo from './';

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'routes',
      'isCollapse'
    ]),
    variables () {
      return variables;
    },

    activeMenu () {
      const route = this.$route;
      const { meta, path } = route;
      console.log('==>', meta, path);
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  },

  methods: {
  }
};
</script>

<style lang="scss">
@import '~/assets/styles/variable.scss';
.sidebar-container {
  transition: width .4s;
  width: 100%;
  background-color: $menuBg;
  height: 100%;
  font-size: 0px;
  overflow: hidden;

    .el-menu {
      border: none;
      height: 100%;
      width: 100%;
    }

    .submenu-title-noDropdown,
    .el-submenu__title {
      &:hover {
        background-color: $menuHover !important;
      }
    }

    .is-active>.el-submenu__title {
      color: $subMenuActiveText !important;
    }

    & .nest-menu .el-submenu>.el-submenu__title,
    & .el-submenu .el-menu-item {
      min-width: $sideBarWidth !important;
      background-color: $subMenuBg !important;

      &:hover {
        background-color: $subMenuHover !important;
      }
    }
  }

  .el-menu--collapse .el-menu .el-submenu {
    min-width: $sideBarWidth !important;
  }

.el-menu--vertical {
  &>.el-menu {
    .item-icon {
      margin-left: 16px;
    }
    .items-icon {
      margin-right: 12px;
      margin-left: -2px;
    }
  }

  .nest-menu .el-submenu>.el-submenu__title,
  .el-menu-item {
    &:hover {
      background-color: $menuHover !important;
    }
  }
  >.el-menu--popup {
    max-height: 100vh;
    overflow-y: auto;

    &::-webkit-scrollbar-track-piece {
      background: #d3dce6;
    }

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-thumb {
      background: #99a9bf;
      border-radius: 20px;
    }
  }
}
</style>
