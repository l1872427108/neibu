<template>
  <div
    class="container"
    :class="{'container-collapse': isCollapse}"
  >
    <div class="container-header">
      <top />
      <tags class="container-tags" />
    </div>

    <div class="container-layout">
      <div class="container-left">
        <side-bar />
      </div>

      <div class="container-main">

        <!-- <el-scrollbar style="height:100%"> -->
          <keep-alive>
            <router-view
              v-if="$route.meta.keepAlive"
              :key="key"
              class="container-view"
            />
          </keep-alive>
          <router-view
            v-if="!$route.meta.keepAlive"
            :key="key"
            class="container-view"
          />
        <!-- </el-scrollbar> -->
      </div>
    </div>
  </div>
</template>

<script>
import top from './top';
import SideBar from './Sidebar';
import tags from './TagsView/index';
import { mapGetters } from 'vuex';
export default {
    name: 'Home',
    components: {
        top,
        SideBar,
        tags
    },
    computed: {
      ...mapGetters(['isCollapse']),
      key () {
        return this.$route.path;
      }
    },
    methods: {
      showCollapse () {
        console.log(1);
      }
    }
};
</script>

<style lang="scss">
@import '~/assets/styles/variable.scss';
.container-left,
.container-header,
.container-top,
.container-layout
.container-main {
    transition: all .3s;
}

.container {
    width: 100%;
    height: 100%;
    background: #f0f2f5;
}

.container-left {
  position: fixed;
  left: 0;
  top: 0;
  width: $sideBarWidth;
  height: 100%;
  z-index: 1025;
}

.container-header {
  padding-left: $sideBarWidth;
  width: calc(100%-60px);
  background-color: #fff;
  box-sizing: border-box;
  .container-tags {
    border: 1px solid Transparent;
  }
}

.container-main {
  position: absolute;
  left: $sideBarWidth;
  padding: 0;
  width: calc(100% - 200px);
  height: calc(100% - 65px);
  box-sizing: border-box;
  overflow: auto;
}

.container-view {
  width: 100%;
  box-sizing: border-box;
}
.el-scrollbar__wrap{
  overflow-x: hidden;

}

.container-collapse {
  .container-header{
    padding-left: $sideBarCollapseWidth;
  }
  .container-main {
    width: calc(100% - $sideBarCollapseWidth);
    left: $sideBarCollapseWidth;
  }
  .container-left {
    width: $sideBarCollapseWidth;
  }

  .main-container {
    margin-left: $sideBarCollapseWidth;
  }

  .submenu-title-noDropdown {
    padding: 0 !important;
    position: relative;

    .el-tooltip {
      padding: 0 !important;
    }
  }

  .el-submenu {
    overflow: hidden;

    &>.el-submenu__title {
      padding: 0 !important;

      .item-icon {
        margin-left: 17px;
      }

      .el-submenu__icon-arrow {
        display: none;
      }
    }
  }

  .el-menu--collapse {
    .el-submenu {
      &>.el-submenu__title {
        &>span {
          height: 0;
          width: 0;
          overflow: hidden;
          visibility: hidden;
          display: inline-block;
        }
      }
    }
  }
}


@media screen and (max-width: 992px) {
    /* .container-left,
    .container-main {
        left: 0;
        width: 100%;
    }
    .container-header {
        margin-bottom: 15px;
        padding-left: 15px;
    }
    .top-bar__item {
        display: none;
    }
    .container-collapse {
        .container-left,
        .container-main {
            left: 200px;
            width: 100%;
        }
        .container-header {
            padding: 0;
            transform: translate3d(200px, 0, 0);
        }
    } */
}
</style>
