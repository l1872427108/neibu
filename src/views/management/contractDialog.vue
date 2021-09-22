<template>
    <el-dialog
        title="查看合同"
        :visible.sync="visible"
        width="50%"
        :before-close="handleClose"
        destroy-on-close
      >
        <div class="image">
            <img style="width: 100%; height: 100%;" :src="image" alt="">
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
        }
    }
};
</script>

<style scoped>
.image {
    width: 100%;
    height: 80%;
    overflow-y: auto;
}
</style>
