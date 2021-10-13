<template>
  <div class="sign">
    <el-dialog :close-on-press-escape="true"  :width="signDialogWidth" title="合同签字"  :visible.sync="visible"
        :show-close="false">
      <sign-canvas
        class="sign-canvas"
        ref="SignCanvas"
        :options="signOptions"
        v-model="signValue"
      />
      <div class="btnList">
        <el-button
          type="danger"
          size="small"
          icon="el-icon-delete"
          @click="canvasClear()"
          >清空</el-button
        >
        <el-button
          type="primary"
          size="small"
          icon="el-icon-check"
          @click="saveAsImg()"
          >保存</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import SignCanvas from 'sign-canvas';
export default {
  name: 'signDialog',
  components: {
      SignCanvas
  },
  props: {
    // 弹窗变量
    visible: {
      type: Boolean,
      default: false
    },
    // 图片信息Base64
    src: {
      type: String,
      default: null
    },
    remoteDialog: Function
  },
  data () {
    return {
      signValue: null,
      signDialogWidth: '',
      signOptions: {
        lastWriteSpeed: 1,
				lastWriteWidth: 2,
				lineCap: 'round',
				lineJoin: 'round',
				canvasWidth: 729,
				canvasHeight: 460,
				isShowBorder: false,
				bgColor: '#E6E6E6',
				borderWidth: 1,
				borderColor: '#ff787f',
				writeWidth: 5,
				maxWriteWidth: 30,
				minWriteWidth: 5,
				writeColor: '#101010',
				isSign: true,
				imgType: 'png'
      }
    };
  },
  mounted () {
    this.initSignConfig();
    window.addEventListener('resize', this.initSignConfig);
  },
  methods: {
    initSignConfig () {
      this.signDialogWidth = `${document.body.offsetWidth / 2 + 40}px`;
      this.signOptions.canvasWidth = document.body.offsetWidth / 2;
      this.signOptions.canvasHeight = document.body.offsetHeight / 2;
    },
    remoteDialogs () {
      this.remoteDialog();
    },
    /**
     * 清除画板
     */
    canvasClear () {
      this.$refs.SignCanvas.canvasClear();
    },

    /**
     * 保存图片
     */
    saveAsImg () {
      const img = this.$refs.SignCanvas.saveAsImg();
      this.$emit('update:visible', false);
      this.$emit('getImage', img);
    }
  }
};
</script>

<style lang="scss" scoped>
.sign >>> .el-dialog{
    background: #b4a078;
}
.sign >>> .el-dialog__header {
    padding: 2px 0px;
}

.sign >>> .el-dialog__body {
    padding: 0;
}
.sign >>> .el-button{
    /*font-family STXingkai*/
    font-size: 12px;
    font-weight: 400;
}
.btnList{
    display: flex;
    justify-content: center;
    align-content: center;
    margin-top: 20px;
}
.sign >>> .el-dialog__title {
    line-height: 32px;
    font-size: 24px;
    /* font-family: STXingkai; */
    color: hsl(40, 28.57% , 30.82%);
    text-shadow: 0 .03em .03em black;
 }
.sign-canvas {
    display: block;
    margin: 0 auto;
    background: #f4f0ea;
    border-radius: 8px;
}
</style>
