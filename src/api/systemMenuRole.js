import request from '~/utils/fetch';

/* 系统查询 */
export function pugesystem (userId) {
  return request({
    url: `/system/system/pugesystem/user/${userId}`,
    method: 'get'
  });
}

/* 菜单查询 */
export function pugemenu (userId, systemId) {
  return request({
    url: `/system/system/menu/user/${userId}/${systemId} `,
    method: 'get'
  });
}
