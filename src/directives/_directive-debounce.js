
// 在开发中， 有些提交保存按钮有时候会在短时间内被惦记多次， 这样子就会重复请求后端接口，
// 造成数据的混乱, 比如新增表单的提交按钮， 多次点击就会新增多条重复的数据。
// 防止按钮在短时间内被点击多次， 使用防抖函数限制规定时间内只能点击一次。

// 思路， 
// 定义一个延迟执行的方法， 如果在延迟时间内再次调用该方法， 则重新计算执行时间。
// 将时间绑定在 click 方法上
const debounce = {
    inserted (el, binding) {
        let timer = null;
        console.log(el);
        // 监听按钮的鼠标抬起,  起来之后
        el.addEventListener('keyup', () => {
            if(timer) {
                clearTimeout(timer);
            }
            // 如果没有清除， 就开始
            timer = setTimeout(() => {
                binding.value();
            }, 1000);
        });
    }
};

export default debounce;