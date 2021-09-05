<template>
  <div class="upload-container">
      <div>
          <el-image v-if="url" :style="`width:${width}px;height:${height}px;`" fit="cover" />
          <div class="mask">
              <div class="actions">
                    <span title="预览" @click="preview(index)">
                        <i class="el-icon-zoom-in" />
                    </span>
                    <span title="移除" @click="remove(index)">
                        <i class="el-icon-delete" />
                    </span>
                </div>
          </div>
      </div>
      <el-upload
        :action="action"
        :data="data"
        :name="name"
        :before-upload="beforeUpload"
        :on-success="handleImageSuccess"
        :show-file-list="false"
        :headers="headers"
      >
        <el-button class="el-icon-upload">上传头像</el-button>
      </el-upload>
  </div>
</template>

<script>
export default {
    name: 'Upload',
    props: {
        action: {
            type: String,
            required: true
        },
        headers: {
            type: Object,
            default: () => {}
        },
        data: {
            type: Object,
            default: () => {}
        },
        name: {
            type: String,
            default: 'image'
        },
        url: {
            type: String,
            default: ''
        },
        ext: {
            type: Array,
            default: () => ['jpg', 'png', 'gif', 'bmp']
        },
        width: {
            type: Number,
            default: 150
        },
        height: {
            type: Number,
            default: 150
        }
    },
    methods: {
        beforeUpload (file) {
            const fileName = file.name.split('.');
            const fileExt = fileName[fileName.length - 1];
            const isTypeOk = this.ext.indexOf(fileExt) >= 0;
            const isSizeOk = file.size / 1024 / 1024 < this.size;
            if (!isTypeOk) {
                this.$message.error(`上传图片只支持 ${this.ext.join(' / ')} 格式！`);
            }
            if (!isSizeOk) {
                this.$message.error(`上传图片大小不能超过 ${this.size}MB！`);
            }
            if (isTypeOk && isSizeOk) {
                this.progress.preview = URL.createObjectURL(file);
            }
            return isTypeOk && isSizeOk;
        },
        onSuccess (res) {
            this.$emit('on-success', res);
        }
    }
};
</script>

<style lang="scss" scoped>
.upload-container {
    position: relative;
    .el-icon-upload {
        margin-right: 10px;
    }
}
</style>
