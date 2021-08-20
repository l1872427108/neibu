const longpress = {
    bind (el, binding, vNode) {
        if(typeof binding.value !== 'function') {
            throw 'callback must be a function';
        }
        let pressTimer = null;
        // 创建定时器  2秒后执行函数
        let start = (e) => {
            if(e.type === 'click' && e.button !== 0) {
                return;
            }
            if(pressTimer === null) {
                pressTimer = setTimeout(() => {
                    handler();
                }, 2000);
            }
        };
        let cancel = (e) => {
            if(pressTimer !== null) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
        };
        const handler = (e) => {
            binding.value(e);
        };
        el.addEventListener('mousedown', start);
        el.addEventListener('touchstart', start);

        el.addEventListener('click', cancel);
        el.addEventListener('mouseout', cancel);
        el.addEventListener('touchend', cancel);
        el.addEventListener('touchcancel', cancel);
    },
    // 当传进来的值更新的时候触发
    componentUpdated (el, { value }) {
        el.$value = value;
    },
    // 指令与元素解绑的时候，移除事件绑定
    unbind (el) {
        el.removeEventListener('click', el.handler);
    }
};

export default longpress;