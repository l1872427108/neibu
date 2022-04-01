<template>
  <div class="layout-navbars-user">
    <el-tooltip
      effect="dark"
      :content="$t('navbar.xws')"
      placement="bottom"
    >
      <div class="layout-navbars-item xws-logo" @click="toXws">
        <img width="100%" height="100%" src="../../../assets/image/xws.png" alt="">
      </div>
    </el-tooltip>
    <el-tooltip
      effect="dark"
      :content="$t('navbar.language')"
      placement="bottom"
    >
      <div class="layout-navbars-item">
        <top-lang />
      </div>
    </el-tooltip>
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
      :src="userInfo.imageUrl || 'https://project-resources.puge.net/WechatIMG111.jpeg'"
      onerror="onerror=null;src='https://project-resources.puge.net/WechatIMG111.jpeg'"
    >
    <el-dropdown slot="dropdown">
      <span class="el-dropdown-link">
        <i class="el-icon-caret-bottom" />
      </span>
      <el-dropdown-menu>
        <el-dropdown-item @click.native="toHome">
          {{ $t('navbar.home') }}
        </el-dropdown-item>
        <el-dropdown-item
          divided
          @click.native="updateAccount"
        >
          {{ $t('navbar.updateAccountInfo') }}
        </el-dropdown-item>
        <el-dropdown-item
          divided
          @click.native="personCenter"
        >
          {{ $t('navbar.personCenter') }}
        </el-dropdown-item>
        <el-dropdown-item
          divided
          @click.native="logout"
        >
          {{ $t('navbar.logOut') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <person-dialog :remote-close="personRemoteClose" :visible="personVisible" />
    <account-dialog :remote-close="remoteClose" :visible="visible" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fullscreenToggel, listenerfullscreen } from '~/utils/util'
import topLang from './topLang.vue'
export default {
  components: {
    topLang,
    AccountDialog: () => import(/* webpackChunkName:"layout" */'../../Account/accountDialog.vue'),
    personDialog: () => import(/* webpackChunkName:"layout" */'../../personage/index.vue')
  },
  data() {
    return {
      showColor: true,
      showDebug: true,
      showTheme: true,
      showFullScren: true,
      visible: false,
      personVisible: false,
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif'
    }
  },

  computed: {
    ...mapGetters([
      'isCollapse',
      'isFullScren',
      'themeConfig',
      'userInfo'
    ]),
    setHeaderHeight() {
      return '100px'
    }
  },

  mounted() {
    console.log('11234565432345432134')
    listenerfullscreen(this.setScreen)
  },

  methods: {
    setCollapse() {
      this.$store.commit('common/SET_COLLAPSE')
    },

    updateAccount() {
      this.visible = true
    },

    personCenter() {
      this.personVisible = true
    },
    logout() {
      this.$confirm(this.$t('logoutTip'), this.$t('tip'), {
        confirmButtonText: this.$t('submitText'),
        cancelButtonText: this.$t('cancelText'),
        type: 'warning'
      }).then(() => {
        window.location.href = `${process.env.VUE_APP_AUTH_URL}/logout?redirectURL=${window.location.href}`
      }).catch(() => {})
    },

    setScreen() {
      this.$store.commit('common/SET_FULLSCREN')
    },

    handleScreen() {
      fullscreenToggel()
    },

    remoteClose() {
      this.visible = false
    },
    personRemoteClose() {
      this.personVisible = false
    },
    toHome() {
      this.$router.push('/')
    },
    toXws() {
      window.location.href = 'https://xws.puge.cn'
    }
  }
}
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
  .xws-logo {
    width: 20px;
    height: 20px;
    cursor: pointer;
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
