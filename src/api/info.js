import request from '~/utils/fetch';

/**
 * 根据id修改用户数据
 */
export function putInfo (data) {
  return request({
    url: '/inside/inside/info',
    method: 'post',
    data
  });
}

/**
 * 根据用户id查询用户信息
 */
 export function searchInfo () {
    return request({
      url: '/inside/inside/info/9',
      method: 'get'
    });
}
