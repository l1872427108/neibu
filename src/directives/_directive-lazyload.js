
// 大量图片， 会造成体积过大 影响页面的加载速度， 造成不良的用户体验。  图片懒加载优化势在必行

// 实现一个图片懒加载指令，只加载浏览器可见区域的图片。

// 思路
// 1. 判断当前图片是否已经到了可是区域这个一核心逻辑实现的。
// 2. 拿到所有的图片 dom， 遍历每个图片判断当前图片是否到了可视区范围内。
// 3. 如果到了就设置图片的src

// 一是 绑定  scroll 时间进行监听， 二是 intersectionOnserver 判断图片是否到了可视区，兼容性。

const LazyLoad = {
    install (Vue, options) {
        const defaultSrc = options.default;
        Vue.directive('lazy', {
            bind (el, binding) {
                this.init(el, binding.value, defaultSrc);
            },
            inserted (el) {
                if (IntersectionObserver) {
                    LazyLoad.observe(el);
                } else {
                    LazyLoad.listenerScroll(el);
                }
            }
        });
    },
    init (el, val, def) {
        el.setAttribute('data-src', val);
        el.setAttribute('src', def);
    },
    // 利用inter监听 el
    observe (el) {
        let io = new IntersectionObserver((entries) => {
            const realSrc = el.dataset.src;
            if (entries[0].isIntersecting) {
                if (realSrc) {
                    el.src = realSrc;
                    el.removeAttribute('data-src');
                }
            }
        });
        io.observe(el);
    },
    // 监听scroll事件
    // 节流
    listenerScroll (el) {
        const handler = LazyLoad.throttle(LazyLoad.load, 300);
        LazyLoad.load(el);
        window.addEventListener('scroll', () => {
            handler(el);
        });
    },
    load (el) {
        const windowHeight = document.documentElement.clientHeight;
        const elTop = el.getBoundingClientRect().top;
        const elBtm = el.getBoundingClientRect().bottom;
        const realSrc = el.dataset.src;
        if (elTop - windowHeight < 0 && elBtm > 0) {
            if (realSrc) {
                el.src = realSrc;
                el.removeAttribute('data-src');
            }
        }
    },
    throttle (fn, delay) {
        let timer;
        let prevTime;
        return function (...args) {
            const currTime = Date.now();
            const context = this;
            if (!prevTime) prevTime = currTime;
            clearTimeout(timer);
 
            if (currTime - prevTime > delay) {
                prevTime = currTime;
                fn.apply(context, args);
                clearTimeout(timer);
                return;
            }
 
            timer = setTimeout(function () {
                prevTime = Date.now();
                timer = null;
                fn.apply(context, args);
            }, delay);
        };
    },
};