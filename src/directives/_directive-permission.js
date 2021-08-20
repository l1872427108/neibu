
// 在一些后台管理系统中， 我们可能需要根据用户角色进行一些操作权限的判断，很多时候都是简单粗暴的
// 直接添加一个元素 v-if/v-else 来进行显示隐藏， 但如果判断条件繁琐且多个地方需要判断，
// 这种方式的代码不仅优雅而且荣誉， 自定义指令。

// 对权限判断的dom进行显示隐藏

// 自定义一个权限数组， 
// 判断用户的权限是否在这数组内， 

function checkArray (key) {
    let arr = ['1', '2', '3', '4'];
    let index = arr.indexOf(key);
    if(index > -1) {
        return true;
    } 
        return false;
    
}

const permission = {
    inserted (el, binding) {
        let permission = binding.value;   // 获取到v-permission 的值
        if(permission) {
            let hasPermission = checkArray(permission);
            if(!hasPermission) {
                // 没有权限， 移除 dom 元素
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    }
};