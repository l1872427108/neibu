<template>
  <div class="wrap">
    <div class="u11">
      <span>账号信息</span>
    </div>
    <div class="u10_state0" data-label="账号信息">
      <div class="u13">
        <Upload action="htttp://123.com"></Upload>
      </div>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="u14">
        <el-row>
          <el-col>
            <el-form-item label="账  号:" prop="name" :span="18" style="font-size: 17px !important">
              <el-input v-model="ruleForm.name" label-width="100px" :span="18"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="普歌网名:" prop="pugename">
          <el-input maxlength="300" label-width="100px" v-model="ruleForm.pugename"></el-input>
        </el-form-item>
        <el-form-item label="普歌工号:" prop="number">
          <el-input v-model="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item label="个性签名:" prop="cname" >
          <el-input type="textarea" v-model="ruleForm.cname" class="textarea"></el-input>
        </el-form-item>
        <el-form-item label="性 别:">
          <el-radio-group v-model="ruleForm.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="生 日:" required>
          <el-col :span="11">
            <el-form-item prop="date1">
              <el-date-picker
                type="date"
                placeholder="选择日期"
                v-model="ruleForm.date1"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item label="邮 箱:" prop="email">
          <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="phone">
          <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item class="sum">
          <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
          <el-button @click="resetForm('ruleForm')">修改</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import Upload from '~/components/Upload';
import { checkPhone, checkEmail } from '~/utils/validate';
export default {
  components: {
    Upload
  },
  data () {
    const checkNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入普歌工号'));
      }
        const reg = /^[0-9]{3,15}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error('请输入正确的工号'));
        }
    };

    return {
      ruleForm: {
        name: '',
        pugename: '',
        number: '',
        cname: '',
        sex: '男',
        email: '',
        phone: '',
        date1: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        pugename: [
          { required: true, message: '请输入普歌网名', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        number: [{ required: true, validator: checkNumber, trigger: 'blur' }],
        cname: [
          { required: true, message: '请输入个性签名', trigger: 'blur' },
          { trigger: 'blur' }
        ],
        date1: [{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        phone: [{ required: true, validator: checkPhone, trigger: 'blur' }]
      }
    };
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('submit');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang="scss" scoped>
.wrap {
  width: 100%;
  .u10_state0 {
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;
    flex-wrap: nowrap;
    text-align: center;
    justify-content: center;
    margin-top: 50px;
  }
  .u11 {
    width: 81px;
    height: 28px;
    font-size: 20px;
    color: rgba(0, 0, 0, 0.847058823529412);
    margin: 50px 0 0 107px;
  }
  .u13 {
    line-height: 22px;
    margin-bottom: 20px;
  }

  .u14 {
    margin-right: 70px;
    width: 500px;
    height: 23px;
    font-family: 'Arial Normal', 'Arial';
    font-weight: 400;
    font-style: normal;
    color: #000000;
  }

  .sum {
    margin-top: 45px;
    height: 150px;
  }
  .el-button {
    width: 150px;
    margin-right: 30px;
  }
  .el-form-item__label {
    font-size: 17px;
  }
  .el-col-11 {
    width: 100%;
  }


  .el-radio__label {
    font-size: 15px;
  }

  .el-radio__input.is-checked + .el-radio__label {
    color: #606266 !important;
  }
  .label {
    font-size: 14px;
  }
}

</style>
