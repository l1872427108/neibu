import request from '~/utils/fetch';


/**
 * 菜单查询
 */
export function menuSearch (data) {
  return request({
    url: '/system/system/menu/search',
    method: 'post',
    data
  });
}

export function pugesystem (userId) {
  return request({
    url: `/system/system/pugesystem/user/${userId}`,
    method: 'get'
  });
}

export function pugemenu (userId, systemId) {
  return request({
    url: `/system/system/menu/user/${userId}/${systemId} `,
    method: 'get'
  });
}
