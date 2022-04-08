<!--  -->
<template>
  <div class="">
    <el-dialog
      title="绩效申报"
      :visible.sync="visible"
      :before-close="handleClose"
      width="400px"
    >
      <el-form
        ref="performanceForm"
        status-icon
        :rules="rules"
        :model="performanceFormData"
        label-width="100px"
      >
        <el-form-item label="绩效项：" prop="performanceName">
          <el-cascader
            ref="labelAll"
            :options="performanceList"
            :props="SetKesDept"
            :show-all-levels="false"
            @change="getNum"
          />
        </el-form-item>
        <el-form-item label="分值：" prop="performanceScore" class="tag-left">
          <el-input-number v-model="performanceFormData.performanceScore" style="width:190px" disabled />
        </el-form-item>
        <el-form-item label="剩余次数：" prop="nums">
          <el-input-number style="width:190px" :value="approveNums" disabled />
        </el-form-item>
        <el-form-item label="绩效凭证：" prop="approverVoucher">
          <Upload
            :extend="extend"
            :class-name="className"
            :image-url="performanceFormData.approverVoucher"
            @updatePhoto="updatePhoto"
          />
        </el-form-item>
        <el-form-item label="审批人：" prop="approverName">
          <el-select
            v-model="performanceFormData.approverName"
            @change="selectApprove"
          >
            <el-option
              v-for="(item, index) in approveName"
              :key="index"
              :value="item.approverId"
              :label="item.approverName"
            />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button
          :disabled="approveNums === 0"
          type="primary"
          @click="submitForm('performanceForm')"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Upload from '~/components/Upload'
import { mapGetters } from 'vuex'
import {
  selectAllPerformance,
  getNums,
  addDeclare,
  getApprove
} from '~/api/performance'
export default {
  components: { Upload },
  props: {
    visible: {
      // 弹出隐藏
      type: Boolean,
      default: false
    },
    remoteClose: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      extend: '.jpg,.png',
      className: 'avatar-uploader',
      performanceFormData: {
        performanceName: '',
        performanceId: '',
        approverVoucher: '',
        performanceScore: '',
        declareId: '',
        approverId: '',
        approverName: '',
        declareName: ''
      },
      approveNums: '',
      SetKesDept: {
        value: 'id',
        label: 'performanceName',
        children: 'sonlist'
      },
      disable: false,
      performanceList: [],
      approveName: [],
      rules: {
        performanceName: [
          { required: true, message: '请选择绩效项', trigger: 'change' }
        ],
        performanceScore: [
          { required: true, message: '分数不能为空', trigger: 'change' }
        ],
        approverVoucher: [
          { required: true, message: '请添加绩效凭证', trigger: 'change' }
        ],
        approverName: [
          { required: true, message: '请选择审批人', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['userInfo'])
  },
  created() {
    this.__init()
  },
  methods: {
    __init() {
      this.getPerformanceList()
      this.getApproveList()
      this.performanceFormData.declareId = this.userInfo.uid
      this.performanceFormData.declareName = this.userInfo.nickName
    },
    handleClose() {
      // 表单清空
      this.$refs['performanceForm'].resetFields()
      this.performanceFormData = {}
      this.performanceList = []
      this.remoteClose()
    },
    // 提交表单
    submitForm(formName) {
      console.log(formName)
      console.log('this', this.performanceFormData)
      this.$refs[formName].validate((valid) => {
        console.log('this', this.performanceFormData)
        if (valid) {
          this.submitData()
        } else {
          return false
        }
      })
    },
    selectApprove(e) {
      this.performanceFormData.approverId = e
      this.approveName.map((item) => {
        if (item.approverId === e) {
          this.performanceFormData.approverName = item.approverName
        }
      })
    },
    getApproveList() {
      getApprove().then((res) => {
        this.approveName = res.data.approverlist
      })
    },
    updatePhoto(img) {
      this.performanceFormData.approverVoucher = img
    },
    getPerformanceList() {
      selectAllPerformance().then((res) => {
        this.performanceList = res.data.performanceList
        // console.log(this.performanceList)
      })
    },
    getDisibleClick() {
      this.$message({
        message: '该绩效项可申请的剩余次数已用完！',
        type: 'warning',
        duration: 1000
      })
    },
    getNum(e) {
      console.log(e)
      // console.log('eee', e[e.length - 1])
      this.performanceFormData.performanceId = e[e.length - 1]
      const labels = this.$refs['labelAll'].getCheckedNodes()[0].pathLabels
      this.performanceFormData.performanceScore = this.$refs['labelAll'].getCheckedNodes()[0].data.performanceScore
      this.performanceFormData.performanceName = labels[labels.length - 1]
      /**
			 * 剩余次数
			 */
      getNums(e[e.length - 1], this.userInfo.uid).then((res) => {
        this.$nextTick(() => {
          this.approveNums = res.data.nums
          if (this.approveNums === 0) {
            this.getDisibleClick()
          }
        })
      })
    },
    submitData() {
      console.log('111', this.performanceFormData)
      addDeclare(this.performanceFormData).then(response => {
        this.$message({
          message: '保存成功',
          type: 'success'
        })
        this.handleClose()
      })
    }
  }
}
</script>
<style lang='scss' scoped>
.el-input-number ::v-deep.el-input-number__decrease,
.el-input-number ::v-deep .el-input-number__increase {
	height: 94%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.tag-flex {
	display: flex;
	align-items: center;
	.tag-left {
		margin-right: 20px;
	}
}
</style>
