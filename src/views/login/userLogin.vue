<template>
  <el-form
    ref="loginForm"
    :model="loginForm"
    :rules="rules"
    class="login-form"
    label-width="0"
  >
    <el-form-item prop="username">
      <el-input
        v-model="loginForm.username"
        size="small"
        :placeholder="$t('login.username')"
        auto-complete="off"
        @keyup.enter.native="handleLogin"
      >
        <i
          slot="prefix"
          class="basic-icon basic-icon-username"
        />
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="loginForm.password"
        size="small"
        :type="passwordType"
        placeholder="密码"
        auto-complete="off"
        @keyup.enter.native="handleLogin"
      >
        <i
          slot="suffix"
          class="el-icon-view el-input__icon"
          @click="showPassword"
        />
        <i
          slot="prefix"
          class="basic-icon basic-icon-password"
        />
      </el-input>
    </el-form-item>
    <el-form-item
      v-if="captchaMode"
      prop="code"
    >
      <el-row :span="24">
        <el-col :span="16">
          <el-input
            v-model="loginForm.code"
            size="small"
            auto-complete="off"
            :placeholder="$t('login.code')"
            @keyup.enter.native="handleLogin"
          >
            <i
              slot="prefix"
              class="basic-icon basic-icon-yanzhengma"
            />
          </el-input>
        </el-col>
        <el-col :span="8">
          <div class="login-code">
            <img
              :src="loginForm.image"
              class="login-code-img"
              @click="refreshCode"
            >
          </div>
        </el-col>
      </el-row>
    </el-form-item>
    <el-form-item>
      <el-button
        type="primary"
        size="small"
        class="login-submit"
        @click.native.prevent="handleLogin"
      >
        {{ $t('login.submit') }}
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import website from '../../config/website';
export default {
    data () {
        return {
            captchaMode: website.captchaMode,
            loginForm: {
                username: '',
                password: '',
                code: '',
                image: "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",
            },
            rules: {
                username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
                password: [{ required: true, message: '请输入密码', trigger: 'blur' },
                {min: 1, message: "密码长度最少为6位", trigger: "blur"}]
            },
            passwordType: 'password'
        };
    },
    
    methods: {
        showPassword () {
            this.passwordType === '' ? (this.passwordType = 'password') : (this.passwordType = '');
        },
        handleLogin () {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                  const loading = this.$loading({
                    lock: true,
                    text: '登录中,请稍后。。。',
                    spinner: "el-icon-loading"
                  });
                this.$store.dispatch('user/login', this.loginForm)
                    .then(() => {
                    this.$router.push({path: '/'});
                    loading.close();
                    }).catch(() => {
                      loading.close();
                    });
                }
            });
        },
        refreshCode () {
          
        }
    }
};
</script>

<style lang="scss">
.login-form {
    margin: 10px 0;
    i {
      color: #333;
    }
    .el-form-item__content {
      width: 100%;
    }
    .el-form-item {
      margin-bottom: 12px;
    }
    .el-input {
      input {
        padding-bottom: 10px;
        text-indent: 5px;
        background: transparent;
        border: none;
        border-radius: 0;
        color: #333;
        border-bottom: 1px solid rgb(235, 237, 242);
        /* -webkit-box-shadow: 0 0 0 1000px white inset !important; */
        transition: background-color 5000s ease-in-out 0s;
      }
      .el-input__prefix {
        i {
          padding: 0 4px;
          font-size: 13px !important;
        }
      }
    }
  }
  .login-submit {
    width: 100%;
    height: 45px;
    border: 1px solid #409EFF;
    background: none;
    font-size: 18px;
    letter-spacing: 2px;
    font-weight: 300;
    background: #409EFF;
    cursor: pointer;
    margin-top: 30px;
    font-family: "neo";
    transition: 0.25s;
  }
.login-code {
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin: 0 0 0 10px;
}
.login-code-img {
  margin-top: 2px;
  width: 100px;
  height: 38px;
  background-color: #fdfdfd;
  border: 1px solid #f0f0f0;
  color: #333;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 5px;
  line-height: 38px;
  text-indent: 5px;
  text-align: center;
  cursor:pointer!important;
}
</style>