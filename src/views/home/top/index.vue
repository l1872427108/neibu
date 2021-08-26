<template>
  <div class="top">
    <div class="left">
      <div
        class="breadcrumb"
        :class="[{ 'breadcrumb--active': isCollapse }]"
      >
        <i
          class="basic-icon basic-icon-navicon-round"
          @click="setCollapse"
        />
      </div>
    </div>
    <div class="right">
      <el-tooltip
        v-if="showColor"
        effect="dark"
        :content="$t('navbar.color')"
        placement="bottom"
      >
        <div class="top-item">
          <top-color />
        </div>
      </el-tooltip>

      <el-tooltip
        v-if="showDebug"
        effect="dark"
        :content="logsFlag?$t('navbar.bug'):logsLen+$t('navbar.bugs')"
        placement="bottom"
      >
        <div class="top-item">
          <top-logs />
        </div>
      </el-tooltip>

      <el-tooltip
        v-if="showLock"
        effect="dark"
        :content="$t('navbar.lock')"
        placement="bottom"
      >
        <div class="top-item">
          <top-lock />
        </div>
      </el-tooltip>

      <el-tooltip
        v-if="showTheme"
        effect="dark"
        :content="$t('navbar.theme')"
        placement="bottom"
      >
        <div class="top-item top-item-show">
          <top-theme />
        </div>
      </el-tooltip>

      <el-tooltip
        effect="dark"
        :content="$t('navbar.language')"
        placement="bottom"
      >
        <div class="top-item top-item-show">
          <top-lang />
        </div>
      </el-tooltip>

      <el-tooltip
        v-if="showFullScren"
        effect="dark"
        :content="isFullScren?$t('navbar.screenfullF'):$t('navbar.screenfull')"
        placement="bottom"
      >
        <div class="top-item">
          <i
            :class="isFullScren?'icon-tuichuquanping':'icon-quanping'"
            @click="handleScreen"
          />
        </div>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
import topColor from './topColor.vue';
import topLogs from './topLogs.vue';
import topLock from './topLock.vue';
import topTheme from './topTheme.vue';
import topLang from './topLang.vue';
export default {
  components: {
    topColor,
    topLogs,
    topLock,
    topTheme,
    topLang
  },
  data () {
    return {
      showColor: true,
      showDebug: true,
      showLock: true,
      showTheme: true,
      showFullScren: true,
      isFullScren: true
    };
  },
  methods: {
    setCollapse () {

    }
  }
};
</script>

<style scoped lang="scss">
.top {
    padding: 0 25px;
    position: relative;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
    color: rgba(0, 0, 0, .65);
    font-size: 28px;
    height: 64px;
    box-sizing: border-box;
    white-space: nowrap;
    .el-menu-item{
        i,span{
            font-size: 13px;
        }
    }
}

.left,
.right {
    height: 64px;
    position: absolute;
    top: 0;
    i{
        line-height: 64px;
    }
}

.left {
    left: 20px;
}

.right {
    right: 25px;
    display: flex;
    align-items: center;
}

.top-item {
    position: relative;
    height: 64px;
    margin:0 10px;
    font-size: 16px;
    align-items: center;
    display: flex;
    .el-badge__content.is-fixed{
        top:12px;
        right: 5px;
    }
}

/* 
.top-title {
    height: 100%;
    padding:0 40px;
    box-sizing: border-box;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: inherit;
    font-weight: 400;
} */

</style>