<template>
  <div
    id="login"
    class="login_page fillcontain"
  >
    <!-- <transition
      name="form-fade"
    > -->

    <section
      class="login-weaper"
    >
      <div class="login-left">
        <div class="login-time">
          {{ time }}
        </div>
        <img
          src="~/assets/img/logo.png"
          class="login-img"
          alt=""
        >
        <p class="title">
          {{ $t('login.info') }}
        </p>
      </div>

      <div class="login-border">
        <div class="login-main">
          <h4 class="login-title">
            {{ $t('login.title') }}
          </h4>
          <user-login v-if="activeName === 'userLogin'" />
          <third-login v-else-if="activeName === 'thirdLogin'" />
          <div class="login-menu">
            <a
              href="#"
              @click.stop="activeName = 'userLogin'"
            >{{ $t('login.userLogin') }}</a>
            <a
              href="#"
              @click.stop="activeName = 'thirdLogin'"
            >{{ $t('login.thirdLogin') }}</a>
          </div>
        </div>
      </div>
    </section>
    <!-- </transition> -->
  </div>
</template>

<script>
import { dateFormat } from '../../utils/date';
import UserLogin from './userLogin.vue';
import ThirdLogin from './thirdLogin.vue';
export default {
  components: {
    UserLogin,
    ThirdLogin
  },
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      showLogin: false,
      time: '',
      activeName: 'userLogin'
    };
  },
  created () {
    this.getTime();
  },
  mounted () {
    this.showLogin = true;
  },

  methods: {
    getTime () {
      setInterval(() => {
        this.time = dateFormat(new Date());
      });

      this.$once('hook:beforeDestroy', () => {
        this.time = '';
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~/assets/styles/media';
.login_page {
    background-color: #324057;
    position: relative;
    display: flex;
    align-items: center;
    background: url("http://www.17sucai.com/preview/242158/2015-01-10/%E7%99%BB%E5%BD%95/images/cloud.jpg") 0 bottom repeat-x #049ec4;
    animation: animate-cloud 20s linear infinite;
  }

  .login-weaper {
    margin: 0 auto;
    width: 1000px;
    box-shadow: -4px 5px 10px rgba(0, 0, 0, 0.4);
    .el-input-group__append {
      border: none;
    }
  }

  .login-left, .login-border {
    position: relative;
    min-height: 500px;
    align-items: center;
    display: flex;
  }

  .login-left {
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    justify-content: center;
    flex-direction: column;
    background-color: #409EFF;
    color: #fff;
    float: left;
    width: 50%;
    position: relative;

    .login-img {
      width: 140px;
    }

    .login-time {
      position: absolute;
      left: 25px;
      top: 25px;
      width: 100%;
      color: #fff;
      font-weight: 200;
      opacity: 0.9;
      font-size: 18px;
      overflow: hidden;
    }

    .title {
      margin-top: 60px;
      text-align: center;
      color: #fff;
      font-weight: 300;
      letter-spacing: 2px;
      font-size: 25px;
    }
  }

  .login-border {
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    color: #fff;
    background-color: #fff;
    width: 50%;
    float: left;
    box-sizing: border-box;
  }
  .login-main {
    margin: 0 auto;
    width: 65%;
    box-sizing: border-box;
  }

  .login-main > h4 {
    margin-bottom: 20px;
  }

  .login-main > p {
    color: #76838f;
  }

  .login-title {
    color: #333;
    margin-bottom: 40px;
    font-weight: 500;
    font-size: 22px;
    text-align: center;
    letter-spacing: 4px;
  }

  .login-menu {
    margin-top: 40px;
    width: 100%;
    text-align: center;
    a {
      color: #999;
      font-size: 12px;
      margin: 0px 8px;
    }
  }

</style>
