<template>
  <div>
    <el-dialog title="提交报销" :visible.sync="fromVisible" width="30%" :before-close="rest">
      <el-form
        ref="formData"
        :model="formData"
        :rules="rules"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        status-icon
      >
        <el-form-item label="姓名: " prop="name">
          <!--  eslint-disable-next-line -->
					<el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="报销项: " prop="applyProject">
          <el-input v-model="formData.applyProject" maxlength="50" />
        </el-form-item>
        <el-form-item label="报销金额 " prop="applyMoney">
          <el-input v-model="formData.applyMoney" maxlength="11" />
        </el-form-item>
        <el-form-item label="部门: " prop="department">
          <el-input v-model="formData.department" maxlength="50" />
        </el-form-item>
        <el-form-item label="证明人:" prop="witness">
          <el-input v-model="formData.witness" maxlength="50" />
        </el-form-item>

        <el-form-item label="报销凭证: " prop="payPicture">
          <Upload :image-url="formData.payPicture" :class-name="'avatar-uploader'" :extend="'.jpg,.png'" @func="image" />
        </el-form-item>
        <el-form-item label="报销二维码: " prop="payerQrcode">
          <Upload :image-url="formData.payerQrcode" :class-name="'avatar-uploader'" :extend="'.jpg,.png'" @func="imageQR" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="mini" @click="addApply('formData')">提交申请</el-button>
          <el-button size="mini" @click="rest('formData')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { AddReimbursement } from '~/api/applyReimbursement'

import Upload from '~/components/Upload'

export default {
  name: 'PugeCInsideInfoFrontAddvisible',
  components: {
    Upload
  },
  props: {
    fromVisible: {
      type: Boolean,
      default: false
    },
    handleClose: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {
        payPicture: '',
        payerQrcode: ''
      },
      voucherImg: '',
      QRImg: '',
      ImageUrl: '',
      ImageTwoUrl: '',
      rules: {
        name: [
          { required: true, message: '请输入姓名', trigger: 'blur' },
          { min: 3, max: 6, message: '长度在 3 到 6 个字符', trigger: 'blur' }
        ],
        applyProject: [
          { required: true, message: '请输入报销项', trigger: 'change' }
        ],
        applyMoney: [
          { required: true, message: '请输入报销项', trigger: 'change' }
        ],
        department: [
          { required: true, message: '请输入部门', trigger: 'change' }
        ],
        witness: [
          { required: true, message: '请输入证明人', trigger: 'change' }
        ]
        // payPicture:[
        // 	{ required: true, message: '请上传报销凭证', trigger: 'change' }
        // ],
        // payerQrcode:[
        // 	{ required: true, message: '请上传报销二维码', trigger: 'change' }
        // ]
      }
    }
  },

  mounted() {},

  methods: {
    rest() {
      this.formData = {}
      this.$refs.formData.resetFields()
      this.handleClose()
    },
    addApply(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          AddReimbursement(this.formData).then((res) => {
            if (res.code === 20000) {
              this.$message({
                message: '提交成功',
                type: 'success'
              })
              this.rest()
            }
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    image(img) {
      this.formData.payPicture = img
    },
    imageQR(img) {
      this.formData.payerQrcode = img
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
