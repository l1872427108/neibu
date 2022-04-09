<!--  -->
<template>
  <div class="">
    <el-dialog
      :visible.sync="visible"
      :before-close="handleClose"
      width="400px"
    >
      <el-form
        v-if="searchList"
        status-icon
        label-width="100px"
        style="width: 400px"
      >
        <el-form-item label="绩效申请人：">
          <el-input style="width:200px;" :value="searchList.declareName" disabled />
        </el-form-item>
        <el-form-item label="绩效项：">
          <el-input style="width:200px" :value="searchList.performanceName" disabled />
        </el-form-item>
        <el-form-item label="绩效分值：">
          <el-input-number style="width:200px" :value="searchList.performanceScore" disabled />
        </el-form-item>
        <el-form-item label="绩效凭证：">
          <viewer>
            <img
              :src="searchList.approverVoucher"
              alt=""
              height="200px"
              width="200px"
            >
          </viewer>
        </el-form-item>
        <el-form-item label="申请时间：">
          <el-input style="width:200px" :value="searchList.gmtCreate" disabled />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handleClose">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    visible: {
      // 弹出隐藏
      type: Boolean,
      default: false
    },
    declareId: {
      type: String,
      default: ''
    },
    remoteClose: {
      type: Function,
      default: () => {}
    },
    searchList: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    // 关闭弹窗
    handleClose() {
      this.remoteClose()
    }
  }
}
</script>
<style scoped>
.el-input-number ::v-deep.el-input-number__decrease,
.el-input-number ::v-deep .el-input-number__increase {
	height: 94%;
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
