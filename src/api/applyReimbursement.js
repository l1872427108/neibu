//

import request from '~/utils/request/fetch';

/**
 * 根据用户id查询用户的报销单
 */
export function UserIdSearch (userId) {
  return request({
    url: `/inside/insideInfo/apply/getUserId/${userId}`,
    method: 'get'
  });
}

export function AddReimbursement (data) {
    return request({
        url: '/inside/insideInfo/apply',
        method: 'post',
        data
    });
}
