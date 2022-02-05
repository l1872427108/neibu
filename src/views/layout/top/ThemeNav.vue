<template>
  <div class="layout-navbars-user">
      <el-tooltip
        effect="dark"
        :content="$t('navbar.language')"
        placement="bottom"
      >
        <div class="layout-navbars-item">
          <top-lang />
        </div>
      </el-tooltip>
      <!-- <el-tooltip
        v-if="showDebug"
        effect="dark"
        :content="$t('navbar.bug')"
        placement="bottom"
      >
        <div class="layout-navbars-item">
          <top-logs />
        </div>
      </el-tooltip> -->
      <el-tooltip
        v-if="showFullScren"
        effect="dark"
        :content="isFullScren?$t('navbar.screenfullF'):$t('navbar.screenfull')"
        placement="bottom"
      >
        <div class="layout-navbars-item">
          <i
            class="basic-icon"
            :class="isFullScren?'basic-icon-tuichuquanping-copy':'basic-icon-quanping'"
            @click="handleScreen"
          />
        </div>
      </el-tooltip>
      <img
        class="layout-navbars-image"
        :src="userInfo.imageUrl ? userInfo.imageUrl : avatar"
      >
      <el-dropdown slot="dropdown">
        <span class="el-dropdown-link">
          <i class="el-icon-caret-bottom" />
        </span>
        <el-dropdown-menu>
          <el-dropdown-item>
            <router-link to="/">
              {{ $t('navbar.home') }}
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
</template>

<script>
import { mapGetters } from 'vuex';
import topLogs from './topLogs.vue';
import { fullscreenToggel, listenerfullscreen } from '~/utils/util';
import topLang from './topLang.vue';
import defer from '~/mixins/defer';

export default {
  mixins: [defer],
  components: {
    // topLogs,
    topLang
  },
  data () {
    return {
      showColor: true,
      showDebug: true,
      showTheme: true,
      showFullScren: true,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    };
  },

  computed: {
    ...mapGetters([
      'isCollapse',
      'isFullScren',
      'themeConfig',
      'userInfo'
    ]),
    setHeaderHeight () {
      const { layout } = this.themeConfig;
      return '100px';
    }
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
        window.location.href = `${process.env.VUE_APP_AUTH_URL}/logout?redirectURL=${window.location.href}`;
      }).catch(() => {});
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

<style lang="scss" scoped>
.layout-navbars-user {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .layout-navbars-item {
    position: relative;
    height: 64px;
    margin: 0 8px;
    font-size: 16px;
    align-items: center;
    display: flex;
  }

  .layout-navbars-image {
    margin: 0 8px;
    padding: 2px;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    box-sizing: border-box;
    border: 1px solid #eee;
    vertical-align: middle;
  }
}
</style>
