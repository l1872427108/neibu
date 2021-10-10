<template>
    <el-dialog
        title="合同不存在"
        :visible.sync="visible"
        width="50%"
        :before-close="handleClose"
        destroy-on-close
        center
        :show-close="false"
        :close-on-click-modal="false"
      >
        <div class="error-page-content">
        <img
            :src="`${require('~/assets/svg/errorPage.svg')}`"
        >
        <div class="error-text">
            <div class="error">
            404
            </div>
            <div class="sorry">
            抱歉，该合同不存在，请联系管理员。
            </div>
            <el-button
            type="primary"
            @click="backHome"
            >返回首页</el-button>
      </div>
    </div>
      </el-dialog>
</template>

<script>
export default {
    props: {
        visible: {
            // 弹窗窗口
            type: Boolean,
            default: false
        },
        remoteClose: Function
    },
    methods: {
        handleClose () {
            this.remoteClose();
        },
        backHome () {
            document.location.href = '/';
        }
    }
};
</script>

<style scoped lang="scss">
.error-page-content {
    display: flex;
    img {
      width: 438px;
      height: 269px;
    }
    .error-text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      margin-left: 80px;
      .error {
        font-size: 56px;
        font-weight: 500;
      }
      .sorry {
        font-size: 16px;
        margin-top: 8px;
      }
      ::v-deep .el-button {
        width: 98px;
        margin-top: 40px;
      }
    }
  }
</style>
