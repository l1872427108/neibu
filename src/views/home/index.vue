<template>
  <div
    class="container"
    :class="{collapse: isCollapse}"
  >
    <div class="header">
      <top />
    </div>

    <div class="layout">
      <div class="left">
        <side-bar />
      </div>

      <div class="main">
        <tags />

        <el-scrollbar style="height: 100%">
          <keep-alive>
            <router-view
              v-if="$route.meta.keepAlive"
              class="view"
            />
          </keep-alive>
          <router-view
            v-if="!$route.meta.keepAlive"
            class="view"
          />
        </el-scrollbar>
        <div
          class="shade"
          @click="showCollapse"
        />
      </div>
    </div>
  </div>
</template>

<script>
import top from './top/index.vue';
import SideBar from './sidebar/index.vue';
import tags from './tags.vue';
import { mapGetters } from "vuex";
export default {
    name: "Home",
    components: {
        top,
        SideBar,
        tags
    },
    computed: {
      ...mapGetters('isCollapse'),
      
    },
    methods: {
      showCollapse () {
        
      }
    }
};
</script>

<style lang="scss" scoped>
.left,
.header,
.top,
.layout
.main {
    transition: all .3s;
}

.container {
    width: 100%;
    height: 100%;
    background: #f0f2f5;
    background-size: 100%;
    background-repeat: no-repeat;
}

.left {
  position: fixed;
  left: 0;
  top: 0;
  width: 240px;
  height: 100%;
  z-index: 1025;
}

.collapse {
  .left {
    width: 60px;
  }
  .header {
    padding-left: 60px;
  }
  .main {
    width: calc(100% - 60px);
    left: 60px;
  }
}

.header {
  padding-left: 240px;
  width: 100%;
  background-color: #fff;
  box-sizing: border-box;
}

.main {
  position: absolute;
    left: 240px;
    padding: 0;
    padding-bottom: 20px;
    width: calc(100% - 240px);
    height: calc(100% - 70px);
    box-sizing: border-box;
    overflow: hidden;
}

.view {
   padding-bottom: 22px;
    width: 100%;
    box-sizing: border-box;
}


.shade {
  position: fixed;
  display: none;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .3);
  z-index: 1024;
  &--show {
      display: block;
  }
}


@media screen and (max-width: 992px) {
    $width: 240px;
    .tags {
        display: none;
    }
    .left,
    .logo {
        left: -$width;
    }
    .main {
        left: 0;
        width: 100%;
    }
    .header {
        margin-bottom: 15px;
        padding-left: 15px;
    }
    .top-bar__item {
        display: none;
    }
    .collapse {
        .left,
        .avue-logo {
            width: $width;
            left: 0;
        }
        .main {
            left: $width;
            width: 100%;
        }
        .header {
            padding: 0;
            transform: translate3d(230px, 0, 0);
        }
        .shade {
            display: block;
        }
    }
}
</style>