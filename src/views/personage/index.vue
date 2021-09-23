<template>
  <div class="personage-wrap">
    <div class="personage-left">
      <el-form
        ref="ruleForm"
        :model="ruleform"
        :rules="rules"
        label-width="100px"
      >
        <div class="personage-info">基本信息</div>
          <el-form-item
            label="姓 名:"
            class="name "
            prop="name"
          >
            <el-input
              :disabled="flag"
              v-model="ruleform.name"
              size="medium"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="性 别:"
            class="public"
            prop="pugeSex"
          >
            <el-radio-group v-model="ruleform.pugeSex">
              <el-radio
                :disabled="flag"
                label="男"
              ></el-radio>
              <el-radio
                :disabled="flag"
                label="女"
              ></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="手机号:"
            class="phone"
            prop="mobile"
          >
            <el-input
              :disabled="flag"
              v-model="ruleform.mobile"
              size="medium"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="身份证号:"
            class="sfz"
            prop="nubmerInfo"
          >
            <el-input
              :disabled="flag"
              v-model="ruleform.nubmerInfo"
              size="medium"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="家庭地址:"
            class="dress"
            prop="nativeInfo"
          >
            <el-input
              :disabled="flag"
              v-model="ruleform.nativeInfo"
              size="medium"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="家庭状况:"
            class="family"
            prop="familyMoneyInfo"
          >
            <el-input
              :disabled="flag"
              v-model="ruleform.familyMoneyInfo"
              size="medium"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="家庭人数:"
            class="public"
            prop="familyNumber"
          >
            <el-input-number
              class="jiating"
              v-model="ruleform.familyNumber"
              :disabled="flag"
              controls-position="right"
              :min="1"
              :max="10"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="是否单亲:"
            class="public"
          >
            <el-radio-group v-model="ruleform.yesnoInfo">
              <el-radio
                :label="'1'"
                :disabled="flag"
              >是</el-radio>
              <el-radio
                :label="'0'"
                :disabled="flag"
              >否</el-radio>
            </el-radio-group>
          </el-form-item>
        <div class="personage-info">更多信息</div>
          <el-form-item
            label="普歌工号:"
            class="gonghao"
            prop="pugeNumber"
          >
            <el-input
              :disabled="flag"
              v-model="ruleform.pugeNumber"
              size="medium"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="邮 箱:"
            class="email"
            prop="pugeEmail"
          >
            <el-input
              :disabled="flag"
              v-model="ruleform.pugeEmail"
              size="medium"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="生 日:"
            class="brithday"
            prop="pugeBirthday"
          >
            <el-date-picker
              :disabled="flag"
              v-model="ruleform.pugeBirthday"
              type="date"
              placeholder="选择日期"
            >
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button @click="handleEdit()">修改</el-button>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              :disabled="fa"
            >保存</el-button>
          </el-form-item>
      </el-form>
    </div>
    <div class="personage-right">
      <div>
        <img :src="this.ruleform.photo" width="100px" height='100px' />
      </div>
      <Upload @func="UserUrl" :fa="this.fa"></Upload>
    </div>
  </div>
</template>

<script>
import Upload from '~/components/Upload';
import { identity, checkPhone, checkEmail } from '~/utils/validate';
import { searchInfo, putInfo } from '@/api/info';
import { mapGetters } from 'vuex';
export default {
  components: {
    Upload
  },
  name: 'Page',
  data () {
    return {
      list: [],
      text: '',
      textarea: '',
      flag: true,
      fa: true,
      optionProps: {
        value: 'code',
        label: 'name',
        children: 'sub'
      },
      ruleform: {},
      url: '',

      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 2,
            max: 5,
            message: '长度在 2 到 5 个字符',
            trigger: 'blur'
          }
        ],
        dress: [{ required: true, message: '请填写地址', trigger: 'blur' }],
        gonghao: [{ required: true, message: '请填写工号', trigger: 'blur' }],
        email: [{ required: true, message: '请填写正确的邮箱', validator: checkEmail, trigger: 'blur' }],
        phone: [{ required: true, message: '请填写手机号', validator: checkPhone, trigger: 'blur' }],
        sfz: [{ required: true, validator: identity, message: '请填写正确的证件号码', trigger: 'blur' }],
        nativeInfo: [{ required: true, message: '请填写家庭地址', trigger: 'blur' }],
        familyMoneyInfo: [{ required: true, message: '请填写家庭状况', trigger: 'blur' }],
        brithday: [
          {
            required: true,
            type: 'date',
            message: '请选择日期',
            trigger: 'change'
          }
        ]
      }
    };
  },
  created () {
    this.fetchData();
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  methods: {
    fetchData () {
      this.userInfo.uid && searchInfo(this.userInfo.uid)
        .then(res => {
          this.ruleform = res.data.peopleInfo;
        })
        .catch(() => {
          this.$message.erro('数据加载失败');
        });
    },

    resetForm (formName) {
      this.$refs[formName].resetFields();
    },

    // 修改
    handleEdit () {
      this.flag = false;
      this.fa = false;
    },

    // 修改用户信息
    submitData () {
      this.ruleform.id && putInfo(this.ruleform).then(res => {
        this.$message({
          message: '保存成功',
          type: 'success'
        });
        this.fetchData();
        this.flag = true;
        this.fa = true;
      }).catch(() => {
        this.$message({
          message: '保存失败,请重新输入',
          type: 'error'
        });
      });
      // this.fetchData();
    },
    // 保存
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.submitData();
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    UserUrl (val) {
      this.ruleform.photo = val;
    }
  }
};
</script>

<style lang="scss" scoped>
.personage-wrap {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding: 20px 10px;
  display: flex;
  justify-content: space-between;
}
.personage-info {
  margin-bottom: 30px;
  font-size: 26px;
  margin-left: 50px;
}
.personage-right {
  margin: 50px 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.el-form-item__label {
  color: #000;
}
::v-deep .el-form-item__label:before {
  content: '' !important;
  margin: 0 !important;
}
.el-form-item {
  padding-left: 100px;
}
.el-input {
  width: 367px;
}
.el-input-number.is-controls-right .el-input__inner {
  width: 180px;
}
::v-deep .el-form-item__content {
  margin-left: 100px;
}
::v-deep .el-form-item__label {
  // width: 100px !important;
  font-size: 20px;
  text-align-last: justify;
}
.el-form-item__label span {
  padding-left: 100%;
}
.el-input .renshu {
  width: 100px;
}
.xinxi {
  margin-left: 60px;
  font-size: 30px;
}
.el-button el-button--primary {
  height: 40px;
  width: 140px;
}
.el-radio__input.is-checked + .el-radio__label {
  color: #000000;
}
.el-button {
  width: 140px;
  margin-right: 40px;
  height: 40px;
}
.public {
  text-align: left;
}
::v-deep .el-radio__label {
  font-size: 18px;
}
</style>
