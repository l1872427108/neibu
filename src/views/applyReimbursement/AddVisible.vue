<template>
  <div>
    <el-dialog :title="txt + '报销'" :visible.sync="fromVisible" width="30%" :before-close="rest">
      <el-form
        ref="formData"
        :model="formDatas"
        :rules="rules"
        label-width="100px"
        label-position="right"
        style="width: 400px"
        status-icon
      >
        <el-form-item label="姓名: " prop="name">
          <el-input v-model="formDatas.name" />
        </el-form-item>
        <el-form-item label="报销项: " prop="applyProject">
          <el-input v-model="formDatas.applyProject" maxlength="50" />
        </el-form-item>
        <el-form-item label="报销金额 " prop="applyMoney">
          <el-input v-model="formDatas.applyMoney" maxlength="11" />
        </el-form-item>
        <el-form-item label="部门: " prop="department">
          <el-input v-model="formDatas.department" maxlength="50" />
        </el-form-item>
        <el-form-item label="证明人:" prop="witness">
          <el-input v-model="formDatas.witness" maxlength="50" />
        </el-form-item>

        <el-form-item label="报销凭证: " prop="payPicture">
          <Upload :image-url="formDatas.payPicture" :class-name="'avatar-uploader'" :extend="'.jpg,.png'" @updatePhoto="image" />
        </el-form-item>
        <el-form-item label="报销二维码: " prop="payerQrcode">
          <Upload :image-url="formDatas.payerQrcode" :class-name="'avatar-uploader'" :extend="'.jpg,.png'" @updatePhoto="imageQR" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="mini" @click="refundApply(formDatas.id)">{{ txt }}申请</el-button>
          <el-button size="mini" @click="rest">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { AddReimbursement, EditReimbursement } from '~/api/applyReimbursement'

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
      default: function() {}
    },
    formData: {
      type: Object,
      default: () => {}
    },
    txt: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
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
  computed: {
    formDatas() {
      return this.formData
    }
  },
  mounted() {},

  methods: {
    rest() {
      this.handleClose()
      this.$refs.formData.resetFields()
    },
    refundApply(id) {
      this.$refs.formData.validate((valid) => {
        if (valid) {
          if (id) {
            this.editReimbur()
          } else {
            this.AddReimbur()
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 提交报销单
    AddReimbur() {
      AddReimbursement(this.formDatas).then(() => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.rest()
      })
    },
    // 修改报销单
    editReimbur() {
      EditReimbursement(this.formDatas).then(() => {
        this.$message({
          message: '提交成功',
          type: 'success'
        })
        this.rest()
      })
    },
    image(img) {
      console.log(img)
      this.formDatas.payPicture = img
    },
    imageQR(img) {
      this.formDatas.payerQrcode = img
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
