<template>
  <div>
      <div id="canvas-container" class="canvas-container">
    <canvas class="item" v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas>
  </div>
  <img style="width:100%;height:100%;" :src="htmlUrl" alt="">
  <el-button @click="toImage()">签订</el-button>
  </div>
</template>

<script>
import PDFJS from 'pdfjs-dist';
import workerSrc from 'pdfjs-dist/build/pdf.worker.entry';
import html2canvas from 'html2canvas';
PDFJS.workerSrc = workerSrc;
export default {
    name: 'Pdf',
    props: {
        pageUrl: {
            type: String,
            required: false,
            default: 'http://storage.xuetangx.com/public_assets/xuetangx/PDF/PlayerAPI_v1.0.6.pdf'
        },
        image: {
            required: false,
            type: [String],
            default: null
        }
    },
    data () {
        return {
            pages: [],
            value: null,
            canvas: null,
            context: null,
            container: null,
            flag: false,
            dataurl: null,
            // 填入导出的pdf文件名和html元素
pdfTitle: '因子评价报告',
pdfSelector: '#pdfPrint',
htmlTitle: '页面导出PDF文件名', // pdf文件下载的名称
htmlUrl: ''
        };
    },
    async mounted () {
        this._loadFile();
    },
    methods: {
        toImage () {
            const that = this;
// 第一个参数是需要生成截图的元素,第二个是自己需要配置的参数,宽高等
        window.pageYOffset = 0;
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            const loading = this.$loading({
                lock: true,
                text: '签字中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
            });
            const title = this.htmlTitle;
            const element = document.querySelector('#canvas-container');
             const a = document.createElement('a');
            // console.log(element);
            html2canvas(element, {
                allowTaint: true,
                useCORS: true
                // scale: 1,
                // dpi: 144 // 导出pdf清晰度
            }).then((canvas) => {
                let pageData = new Image();
                // 设置图片跨域访问
                pageData.setAttribute('crossOrigin', 'Anonymous');

                setTimeout(() => {
                    pageData = canvas.toDataURL('image/jpeg', 1.0);
                    console.log(pageData);
                    loading.close();
                    this.htmlUrl = pageData;
                    // that.sendUrl();
                    const blob = this.dataURLToBlob(pageData);
                    console.log(blob);
                }, 1000);
            });
},
dataURLToBlob (dataurl) {
            const arr = dataurl.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], { type: mime });
        },
sendUrl () {
    // / 如果图片需要formData格式,就自己组装一下,主要看后台需要什么参数
    // const formData = new FormData()
    // formData.append('base64', this.company.fileUrl)
    // formData.append('userId', 123)
    // formData.append('pathName', 'pdf')
    // fd.append('file', blob, Date.now() + '.jpg')
    // 第二步：上传分享图
},
    //     getBlob (canvas) { // 获取blob对象
    //         let data = canvas.toDataURL('image/jpeg', 1);
    //         this.dataurl = data;
    //         //   console.log('====>', this.dataurl);
    //         data = data.split(',')[1];
    //         data = window.atob(data);
    //         const ia = new Uint8Array(data.length);
    //         for (let i = 0; i < data.length; i++) {
    //             ia[i] = data.charCodeAt(i);
    //         }
    //         return new Blob([ia], {
    //             type: 'image/jpeg'
    //         });
    // },
        init () {
            this.canvas = document.getElementById(`the-canvas${this.pages}`);
            this.context = this.canvas.getContext('2d');
            this.container = document.getElementById('canvas-container');
            window.setTimeout(() => {
                this.initRect();
            }, 0);
        },
        initRect () {
            this.context.fillStyle = '#ccc';
            this.context.fillRect(this.canvas.getBoundingClientRect().width + this.canvas.offsetLeft - 100, this.canvas.getBoundingClientRect().height, 200, 100);
        },
        canvasInit () {
            this.context.clearRect(this.canvas.getBoundingClientRect().width + this.canvas.offsetLeft - 100, this.canvas.getBoundingClientRect().height, 200, 100);
            const image = new Image();
            image.src = this.image;
            image.width = 300;
            image.height = 200;
            image.setAttribute('crossOrigin', 'Anonymous');
            image.onload = () => {
                this.context.drawImage(image, this.canvas.getBoundingClientRect().width - 400, this.canvas.getBoundingClientRect().height - 300, image.width, image.height);
            };
        },
        _renderPage (num) {
            this.pdfDoc.getPage(num).then((page) => {
            const canvas = document.getElementById('the-canvas' + num);
            const vp = page.getViewport({ scale: 1 });
            const ctx = canvas.getContext('2d');
            const dpr = window.devicePixelRatio || 1;
            const bsr = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
            const ratio = dpr / bsr;
            const viewport = page.getViewport({ scale: window.innerWidth / vp.width });
            canvas.width = viewport.width * ratio;
            canvas.height = viewport.height * ratio;
            canvas.style.width = viewport.width + 'px';
            ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
            const renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };
            page.render(renderContext);
            if (this.pages > num) {
                this._renderPage(num + 1);
            }
            this.flag = true;
            this.$emit('showFlag', this.flag);
            });
        },
        _loadFile () {
            PDFJS.getDocument(this.pageUrl).promise.then(async (pdf) => {
            this.pdfDoc = pdf;
            this.pages = this.pdfDoc.numPages;
            await this.$nextTick();
            await this._renderPage(1);
            this.init();
            });
        },
        saveImage () {
            const image = new Image();
            image.src = this.image;
            image.width = 300;
            image.height = 200;
            image.setAttribute('crossOrigin', 'Anonymous');
            image.onload = () => {
                this.context.drawImage(image, this.canvas.getBoundingClientRect().width + this.canvas.offsetLeft - 100, this.canvas.getBoundingClientRect().height, image.width, image.height);
            };
        }
    },
    watch: {
        image: {
            handler () {
                setTimeout(() => {
                    this.canvasInit();
                }, 0);
            }
        }
    }
};
</script>

<style lang="scss">
 .canvas-container{
     width: 100%;
     margin: 0 auto;
     .item {
        width: 100% !important;
    }
 }
</style>
