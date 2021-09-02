<template>
  <div class="upload-container">
      <el-upload
        :data="dataObj"
        :multiple="false"
        :show-file-list="false"
        :on-success="handleImageSuccess"
        action="https://httpbin.org/post"
      >
        <el-button class="el-icon-upload btn">上传头像</el-button>
      </el-upload>
  </div>
</template>

<script>
export default {
    name: 'Upload',
    props: {
        value: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            tempUrl: '',
            dataObj: { token: '', key: '' }
        };
    },
    computed: {
        imageUrl () {
            return this.value;
        }
    },
    methods: {
        emitInput (val) {
            this.$emit('input', val);
        },
        handleImageSuccess () {
            this.emitInput(this.tempUrl);
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
