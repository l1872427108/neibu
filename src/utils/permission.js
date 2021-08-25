import store from '../store';

// 查看用户是否有权限
function hasPermission (permission) {
  return store.state.user.roles.some(v => {
    return v === permission;
  });
}

// 鉴权
export function auth (value) {
  let auth;
  if (typeof value === 'string') {
    auth = hasPermission(value);
  } else {
    auth = value.some(item => {
      return hasPermission(item);
    });
  }
  return auth;
}

// 多个权限
export function authAll (value) {
  const auth = value.every(item => {
    return hasPermission(item);
  });
  return auth;
}