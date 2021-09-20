import request from '~/utils/fetch';

/**
 * 根据id修改用户数据
 */
export function putInfo (data) {
  return request({
    url: '/inside/inside/info',
    method: 'put',
    data
  });
}

/**
 * 根据用户id查询用户信息
 */
export function searchInfo () {
  return request({
    url: '/inside/inside/info/1439207775006666754',
    method: 'get'
  });
}
