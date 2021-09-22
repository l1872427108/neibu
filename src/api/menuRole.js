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

