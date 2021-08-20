
// 开发中遇到的表单输入， 往往会有输入内容的限制， 比如不能输入表情和特殊字符，只能输入数字和字母。
// on-change 上处理
// 这样代码量比较大而且不好维护，所以我们需要自定义一个指令来解决这问题

let findEle = (parent, type) => {
    return parent.tagName.toLowerCase() === type ? parent : parent.querySelector(type);
};

const trigger = (el, type) => {
    const e = document.createEvent('HTMLEvents');
    e.initEvent(type, true, true);
    el.dispatchEvent(e);
};
const emoji = {
    // 根据正则表达式， 设计自定义处理表单输入规则的指令，
    
    //  // 正则规则可根据需求自定义
    bind (el, binding, vnode) {
        let regRule = /[^u4E00-u9FA5|d|a-zA-Z|rns,.?!，。？！…—&$=()-+/*{}[]]|s/g;
        let $inp = findEle(el, 'input');
        el.$inp = $inp;
        $inp.handle = () => {
            let val = $inp.value;
            $inp.value = val.replace(regRule, '');
 
            trigger($inp, 'input');
        };
        $inp.addEventListener('keyup', $inp.handle);
    },
    "unbind": function (el) {
        el.$inp.removeEventListener('keyup', el.$inp.handle);
    },
};