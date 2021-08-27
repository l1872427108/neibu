import { asyncRoutes, publicRoutes } from '~/router';


function hasPermission (roles, route) {
  // 如果有meta 并且有 路由meta角色
  if (route.meta && route.meta.roles) {
    // 判断是否匹配对应的角色,  有一个就返回true
    return roles.some(role => route.meta.roles.includes(role));
  }
    // 如果没有就代表可访问的，静态
    return true;
}


// 筛选角色的对应的路由
export function filterAsyncRoutes (routes, roles) {
  const res = [];
  // 便利所有的路由
  routes.forEach(route => {
    // 接收下来这条路由的key， 放入一个新的数组
    const tmp = { ...route };
    // 判断是否有权限   roles 角色 temp 是这条路由信息
    if (hasPermission(roles, tmp)) {
      // 如果有角色了， 就走进来，继续判断他的孩子
      if (tmp.children) {
        // 从新走一遍  递归调用 判断 直到没有孩子
        tmp.children = filterAsyncRoutes(tmp.children, roles);
      }
      // 最后把 这条信息push进来 res数组里面,  res就是最终能够走的信息
      res.push(tmp);
    }
  });
  // return 出去
  return res;
}

const state = {
  // 所生成的路由表
  routes: [],
  // 权限路由
  addRoutes: []
};

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes;
    state.routes = publicRoutes.concat(routes);
  }
};

const actions = {
  // 判断动态路由
  generateRoutes ({ commit }, roles) {
    return new Promise(resolve => {
      // 接收动态生成的路由
      let accessedRoutes;
      // 如果是管理员, 就说名所有的页面均可以进入
      if (roles.includes('admin')) {
        accessedRoutes = asyncRoutes || [];
      } else {
        // 不是管理员就要去筛选对应权限的路由表
        // 传入所有的路由表，和角色

        // 这儿就拿到了所有能走的动态路由信息
        accessedRoutes = filterAsyncRoutes(asyncRoutes, roles);
      }
      // 触发，然后就给store上面routers
      commit('SET_ROUTES', accessedRoutes);
      resolve(accessedRoutes);
    });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
