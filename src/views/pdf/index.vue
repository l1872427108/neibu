<template>
    <el-scrollbar style="height:100%">
    <!-- <div style="overflow: scroll;"> -->
        <PdfSign @showFlag="showFlag" :image="image" class="pdfSign">
        </PdfSign>
        <Signature
        :visible.sync="receiverSignFlag"
        @getImage="getImage"
        ></Signature>
         <div class="sign" v-if="show">
                <el-button
                type="primary"
                @click="handleReceiverFlag"
                icon="el-icon-edit"
                >签字</el-button>
        </div>
    <!-- </div> -->
    </el-scrollbar>
</template>

<script>
import PdfSign from '~/components/PdfSign/index';
import Signature from '~/components/Signature';
export default {
    components: {
        PdfSign,
        Signature
    },
    data () {
        return {
            image: '',
            widthDialog: 0,
            receiverSignFlag: false,
            show: false
        };
    },
    methods: {
        handleReceiverFlag () {
            this.receiverSignFlag = true;
        },
        getImage (img) {
            this.image = img;
            console.log(img);
        },
        showFlag (e) {
            this.show = e;
        }
    }
};
</script>

<style lang="scss" scoped>
.sign {
    display: flex;
    justify-content: center;
    align-content: center;
    margin-bottom: 100px;
}
</style>
