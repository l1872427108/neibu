import request from '~/utils/fetch';
/**
 * 合同订单查询
 */
export function searchUserOrder (userId) {
  return request({
    url: `/pay/pay/insideOrder/${userId}`,
    method: 'get'
  });
}
