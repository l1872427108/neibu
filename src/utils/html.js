import html2Canvas from 'html2canvas';
export default {
    install (Vue, options) {
        Vue.prototype.getPdfq = function () {
            // 导出之前先将滚动条置顶,不然会出现数据不全的现象
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
            console.log(element);
            html2Canvas(element, {
                allowTaint: true,
                useCORS: true
                // scale: 1,
                // dpi: 144 // 导出pdf清晰度
            }).then(function (canvas) {
                console.log(canvas);
                const contentWidth = canvas.width;
                const contentHeight = canvas.height;
                const pageHeight = contentWidth / 592.28 * 841.89;
                const leftHeight = contentHeight;
                const position = 0;
                const imgWidth = 595.28;
                const imgHeight = 592.28 / contentWidth * contentHeight;

                let pageData = new Image();
                // 设置图片跨域访问
                pageData.setAttribute('crossOrigin', 'Anonymous');

                setTimeout(() => {
                    pageData = canvas.toDataURL('image/jpeg', 1.0);
                    console.log(pageData);
                    // const PDF = new JsPDF('', 'pt', 'a4');
                    // if (leftHeight < pageHeight) {
                    //     PDF.addImage(pageData, 'JPEG', 0, 0, imgWidth, imgHeight);
                    // } else {
                    //     while (leftHeight > 0) {
                    //         PDF.addImage(pageData, 'JPEG', 0, position, imgWidth, imgHeight);
                    //         leftHeight -= pageHeight;
                    //         position -= 841.89;
                    //         if (leftHeight > 0) {
                    //             PDF.addPage();
                    //         }
                    //     }
                    // }
                    // loading.close();
                    // PDF.save(title + '.pdf');
                }, 1000);
            });
        };
    }
};
