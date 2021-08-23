<template>
  <div class="login_page fillcontain">
    <transition
      name="form-fade"
    >
      <section
        v-if="showLogin"
        class="form_container"
      >
        <el-form
          ref="loginForm"
          :model="loginForm"
          :rules="rules"
        >
          <el-form-item>
            <div class="manage_tip">
              <p>后台管理系统</p>
            </div>
          </el-form-item>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="用户名"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              class="submit_btn"
              @click="submitForm('loginForm')"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
export default {
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
      showLogin: false
    };
  },

  mounted () {
    this.showLogin = true;
  },

  methods: {
    submitForm () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm)
            .then(() => {
              this.$router.push('/');
            });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.login_page {
  background-color: #324057;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form_container {
  width: 320px;
  height: 210px;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background: #fff;
  .submit_btn {
    width: 100%;
    font-size: 16px;
  }
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -120px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
</style>
