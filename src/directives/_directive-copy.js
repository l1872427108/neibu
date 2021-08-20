// v-copy 实现一键复制文本内容， 用于鼠标右键粘贴

// 复制的思路
// 就是 因为可能是很多内容
// 需要长文本框
// 我们就可以直接的进行复制
// 通过动态创建， 创建好之后， 就插入到body中， 然后给赋值， 然后在选中， 调用copy 的方法document
// 完事之后进行删除， 当值更新之后， 就去重新复制 
const copy = {
    bind (el, {value}) {
        console.log('copy=>', el);
        el.$value = value;
        el.handler = () => {
            if(!el.$value) {
                // 值为空的时候， 给出提示
                console.log('无复制的内容');
                return;
            }
            // 动态创建 textarea 标签
            const textarea = document.createElement('textarea');
            // 将该 textarea 设为 readonly 防止 ios 下 自动唤起键盘, 同时将 textarea 移除可视区域
            textarea.readOnly = 'readonly';
            textarea.style.position = 'absolute';
            textarea.style.left = '-9999px';
            // 将要copy 的值赋给 value 属性
            textarea.value = el.$value;
            document.body.appendChild(textarea);
            // 选中值并复制
            textarea.select();
            // 对选中的值 进行复制
            const result = document.execCommand('Copy', true, null);
            // console.log(result)   // true
            if(result) {
                console.log('复制成功');
            }
            document.body.removeChild(textarea);
            // const result = document.
            // document.execCommand() 方法处理 html 数据时 常用语法格式
            // sCommand 指令参数  交互方式 是true的话将显示对话框, 动态参数一般为一可用值或属性值
            // 调用execCommand()可以实现浏览器菜单的很多功能, 如保存文件,打开新文件,撤消、重做操作…等等. 有了这个方法,就可以很容易的实现网页中的文本编辑器.
        };
        // 绑定点击事件， 就是一键copy
        // 绑定的时候， 就一次操作  就监听 点击事件 然后触发这个
        el.addEventListener('click', el.handler);
    },
    inserted (el) {
        console.log('copy=>', el);
    },
    update () {
        console.log('update');
    },
    // 当传入的值更新的时候触发,  更新完成之后调用
    componentUpdated (el, {value}) {
        console.log('=>', value);
        // 让 el.$value 值 重新等于 value 新的值， 就会自己改变
        el.$value = value;
        console.log(el);
    },
    // 指令与元素解绑的时候， 移除事件绑定
    unbind (el) {
        // 解绑的时候 就去 移除事件
        el.removeEventListener('click', el.handler);
    }
};

export default copy;