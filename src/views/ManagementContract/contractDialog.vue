<template>
  <div class="wrap">
    <el-dialog
      :visible.sync="visible"
      width="60%"
      :before-close="handleClose"
      destroy-on-close
      append-to-body
      lock-scroll
      :show-close="false"
    >
      <template slot="title">
        <div> <h1>{{ title }}</h1></div>
      </template>
      <div class="image">
        <img style="width: 100%; height: 100%;" :src="image" alt="">
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {
    visible: {
      // 弹窗窗口
      type: Boolean,
      default: false
    },
    remoteClose: {
      type: Function,
      default: () => {}
    },
    image: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    }
  },
  methods: {
    handleClose() {
      this.remoteClose()
    }
  }
}
</script>

<style scoped lang="scss">
.image {
    width: 100%;
    height: 80%;
    overflow: hidden;
}
</style>
