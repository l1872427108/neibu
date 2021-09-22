<template>
  <div class="top">
    <div class="top-left">
      <div
        class="top-breadcrumb"
        :class="[{'top-collapse': isCollapse}]"
      >
        <i
          class="basic-icon basic-icon-navicon-round"
          @click="setCollapse"
        />
        <breadcrumb class="breadcrumb-container" />
      </div>
    </div>
    <div class="top-right">
      <el-tooltip
        v-if="showColor"
        effect="dark"
        :content="$t('navbar.color')"
        placement="bottom"
      >
        <div class="top-item">
          <!-- <top-color class="top-color" /> -->
        </div>
      </el-tooltip>

      <el-tooltip
        v-if="showDebug"
        effect="dark"
        :content="$t('navbar.bug')"
        placement="bottom"
      >
        <div class="top-item">
          <top-logs />
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
            class="basic-icon"
            :class="isFullScren?'basic-icon-tuichuquanping-copy':'basic-icon-quanping'"
            @click="handleScreen"
          />
        </div>
      </el-tooltip>

      <img
        class="top-img"
        :src="userInfo.avatar"
      >
      <el-dropdown slot="dropdown">
        <span class="el-dropdown-link">
          <i class="basic-icon basic-icon-xiajiantou" />
        </span>
        <el-dropdown-menu>
          <el-dropdown-item>
            <router-link to="/">
              {{ $t('navbar.dashboard') }}
            </router-link>
          </el-dropdown-item>
          <el-dropdown-item
            divided
            @click.native="logout"
          >
            {{ $t('navbar.logOut') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
// import topColor from './topColor.vue';
import Breadcrumb from '~/components/Breadcrumb';
import topLogs from './topLogs.vue';
import topTheme from './topTheme.vue';
import topLang from './topLang.vue';
import { fullscreenToggel, listenerfullscreen } from '~/utils/util';
export default {
  components: {
    // topColor,
    topLogs,
    topTheme,
    topLang,
    Breadcrumb
  },
  data () {
    return {
      showColor: true,
      showDebug: true,
      showTheme: true,
      showFullScren: true,
      userInfo: {
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
      }
    };
  },

  computed: {
    ...mapState({

    }),
    ...mapGetters([
      'isCollapse',
      'isFullScren'
    ])
  },

  mounted () {
    listenerfullscreen(this.setScreen);
  },

  methods: {
    setCollapse () {
      this.$store.commit('common/SET_COLLAPSE');
    },

    logout () {
      this.$confirm(this.$t('logoutTip'), this.$t('tip'), {
        confirmButtonText: this.$t('submitText'),
        cancelButtonText: this.$t('cancelText'),
        type: 'warning'
      }).then(() => {
        this.$store.dispatch('menu/logout').then(() => {
          window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`;
        });
        window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`;
      });
    },

    setScreen () {
      this.$store.commit('common/SET_FULLSCREN');
    },

    handleScreen () {
      fullscreenToggel();
    }
  }
};
</script>

<style lang="scss">
.top {
    width: 100%;
    padding: 0 25px;
    position: relative;
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


.top-left,
.top-right {
    height: 64px;
    position: absolute;
    top: 0;
    i{
        line-height: 64px;
    }
}

.top-left {
    left: 20px;
}

.top-right {
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

.top-img {
  margin: 0 8px 0 5px;
  padding: 2px;
  width: 30px;
  height: 30px;
  border-radius: 100%;
  box-sizing: border-box;
  border: 1px solid #eee;
  vertical-align: middle;
}


</style>
