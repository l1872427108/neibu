import store from '~/store';

function checkPermission (el, binding) {
    // 拿到之后等于号后面的
    const { value } = binding;
    // 拿去用户的当前角色   editor 数组
    const roles = store.getters && store.getters.roles;
    // 首先判断传入的确定是一个数组
    if (value && value instanceof Array) {
        // 判断传入的有长度length
        if (value.length > 0) {
            // ["admin"]
            const permissionRoles = value;
            // 判断是否有权限  roles.some  返回一个true
            const hasPermission = roles.some(role => {
                return permissionRoles.includes(role);
            });
            // 如果没有有权限, 判断是否已经插入父节点，从父亲上删除
            if (!hasPermission) {
                el.parentNode && el.parentNode.removeChild(el);
            }
        }
    } else {
        throw new Error('need roles! Like v-permission="[\'admin\',\'editor\']"');
    }
}

const permission = {
    inserted (el, binding) {
        console.log(el, binding);
        checkPermission(el, binding);
    },
    update (el, binding) {
        checkPermission(el, binding);
    }
};

export default permission;
