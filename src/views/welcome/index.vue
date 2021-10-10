<template>
  <div class="welcome accommodate">
    <div class="welcome-image">
      <img class="welcome-image-logo" src="~/assets/image/logo.png">
    </div>
    <div class="welcome-title">
      <div class="welcome-title-user">
        {{username}}
      </div>
      <div class="welcome-title-user">
        欢迎使用内部信息化平台
      </div>
    </div>
  </div>
</template>

<script>
import {
  Cookie,
  Key
} from '~/utils/cookie';
export default {
  computed: {
    username () {
      return JSON.parse(Cookie.get(Key.userInfoKey)).nickName;
    }
  }
};
</script>

<style lang="scss">
.el-scrollbar__view {
  height: 100%;
}
</style>
<style lang="scss" scoped>
@import '~/styles/mixins/mixin';
.welcome {
  .welcome-image {
    position: absolute;
    top: 7%;
    left: 7%;
  }
  .welcome-image-logo {
    width: 200px;
  }
  .welcome-title {
    @include vertical;
  }
  .welcome-title-user {
    font-size: 16px;
  }
}
</style>
