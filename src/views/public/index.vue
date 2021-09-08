<template>
  <div class="gr">
    <div class="gr-left">
      <el-form ref="ruleForm" :model="ruleform" :rules="rules" label-width="200px">
        <h2 class="xinxi">基本信息</h2>
        <el-form-item label="姓名:" class="name " prop="names">
          <el-input v-model="ruleform.names" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="性别:" class="sex" prop="sex">
          <el-radio-group v-model="ruleform.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="手机号:" class="phone" prop="phone">
          <el-input v-model="ruleform.phone" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="身份证号:" class="sfz" prop="sfz">
          <el-input v-model="ruleform.sfz" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="所在省市:" class="shengshi" prop="shengshi">
          <el-cascader
            v-model="ruleform.area"
            :options="areaList"
            :props="optionProps"
            filterable
            ref="myCascader"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="街道地址:" class="dress" prop="dress">
          <el-input v-model="ruleform.dress" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="家庭人数:" class="renshu" prop="renshu">
          <el-input-number
            class="jiating"
            v-model="ruleform.renhshu"
            controls-position="right"
            @change="handleChange"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="是否单亲:" class="danqin">
          <el-radio-group v-model="ruleform.danqin">
            <el-radio label="是"></el-radio>
            <el-radio label="否"></el-radio>
          </el-radio-group>
        </el-form-item>
        <h2 class="xinxi">更多信息</h2>
        <el-form-item label="普歌工号:" class="gonghao" prop="gonghao">
          <el-input v-model="ruleform.gonghao" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="分配基地:" class="jidi" prop="jidi">
          <el-input v-model="ruleform.jidi" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="岗位:" class="gangwei" prop="gangwei">
          <el-select v-model="ruleform.gangwei" placeholder="请选择岗位">
            <el-option label="校区总监" value="shanghai"></el-option>
            <el-option label="校区副总监" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学院:" class="xueyuan" prop="xueyuan">
          <el-input v-model="ruleform.xueyuan" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="班级:" class="banji" prop="banji">
          <el-input v-model="ruleform.banji" size="medium"></el-input>
        </el-form-item>
         <el-form-item label="邮箱:" class="email" prop="email">
          <el-input v-model="ruleform.email" size="medium"></el-input>
        </el-form-item>
        <el-form-item label="生日:" class="brithday" prop="brithday">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="ruleform.brithday"
            style="width: 100%"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="个性签名：" class="qianming">
          <div style="margin: 20px 0;"></div>
          <el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="300" show-word-limit>
          </el-input>
        </el-form-item>
        <el-form-item label="用户个人信息密码:" prop="mima">
          <el-input type="password" v-model="ruleform.mima" size="medium"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">保存</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="gr-right">
      <img class="touxiang" src="~/assets/img/picture.png" alt="" />
    </div>
  </div>
</template>

<script>
import { identity, checkPhone, checkEmail } from '~/utils/validate';
export default {
  name: 'Page',
  data () {
    return {
      renshu: 1,
      text: '',
      textarea: '',
      // eslint-disable-next-line
      areaList: rawCitiesData,
      optionProps: {
        value: 'code',
        label: 'name',
        children: 'sub'
      },
      ruleform: {
        namess: '',
        region: '',
        sex: '男',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        imageUrl: '',
        danqin: '否',
        area: [],
        email: ''
      },

      rules: {
        names: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          {
            min: 3,
            max: 5,
            message: '长度在 3 到 5 个字符',
            trigger: 'blur'
          }
        ],
        shengshi: [{ required: true, message: '请填写所在省市', trigger: 'blur' }],
        dress: [{ required: true, message: '请填写地址', trigger: 'blur' }],
        gonghao: [{ required: true, message: '请填写工号', trigger: 'blur' }],
        jidi: [{ required: true, message: '请填写正确的基地', trigger: 'blur' }],
        gangwei: [{ required: true, message: '请填写所在岗位', trigger: 'blur' }],
        email: [{ required: true, validator: checkEmail, trigger: 'blur' }],
        phone: [{ required: true, validator: checkPhone, trigger: 'blur' }],
        sfz: [{ required: true, message: '请填写证件号码', trigger: 'blur', validator: identity }],
        xueyuan: [{ required: true, message: '请填写所在学院', trigger: 'blur' }],
        banji: [{ required: true, message: '请填写所在班级', trigger: 'blur' }],
        brithday: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ]
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
    },
    handleChange (value) {
      console.log(value);
    }
  }
};
</script>

<style lang="scss" scoped>
.gr-left {
  float: left;
}
.gr-right {
  float: right;
  margin-top: 70px;
  margin-right: 450px;
}
.el-form-item__label {
  color: #000;
}
.el-form-item {
  margin-left: 100px;
}
.el-input {
  width: 367px;
}
.el-input-number.is-controls-right .el-input__inner {
  width: 180px;
}
::v-deep .el-form-item__label {
    font-size: 17px;
  }
.el-input .renshu {
  width: 100px;
}
.xinxi {
  margin: 40px 30px;
}
.touxiang {
  width: 200px;
  height: 205px;
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
  height: 40px;
}
</style>
