import request from '~/utils/request/fetch';

/**
 * 根据id修改用户数据
 */
export function personPutInfo (data) {
  return request({
    url: '/inside/inside/info',
    method: 'put',
    data
  });
}

/**
 * 根据用户id查询用户信息
 */
export function personSearchInfo (userid) {
  return request({
    url: `/inside/inside/info/${userid}`,
    method: 'get'
  });
}


/**
 * 根据用户id修改头像
 */
 export function personUpdatePhoto (userid, data) {
  return request({
    url: `/inside/inside/info/${userid}`,
    method: 'put',
    data
  });
}
