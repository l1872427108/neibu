//

import request from '~/utils/request/fetch'

/**
 * 根据用户id查询用户的报销单
 */
export function UserIdSearch(userId) {
  return request({
    url: `/inside/insideInfo/apply/getUserId/${userId}`,
    method: 'get'
  })
}

/**
 *
 * @param {*} data
 * @returns
 */
export function AddReimbursement(data) {
  return request({
    url: '/inside/insideInfo/apply',
    method: 'post',
    data
  })
}

/**
 * 根据报销单的id查询
 * @param {*} id  当前报销单的id
 * @returns
 */

export function SearchReimbursement(id) {
  return request({
    url: `/inside/insideInfo/apply/selectById/${id}`,
    method: 'get'
  })
}

/**
 * 修改报销单
 * @param {*} data
 * @returns
 */
export function EditReimbursement(data) {
  return request({
    url: '/inside/insideInfo/apply/updateC',
    method: 'post',
    data
  })
}
