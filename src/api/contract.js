import request from '~/utils/fetch';

/**
 * 查询个人所有合约
 */
export function search (userId) {
  return request({
    url: `/inside/inside/personal-contract/${userId}`,
    method: 'get'
  });
}


/**
 * 签约-提交审核
 */
 export function contractExamine (userId) {
    return request({
      url: '/inside/inside/personal-contract/contractExamine',
      method: 'get'
    });
}

/**
 * 申请解约
 */
 export function contractTerminate (userId) {
    return request({
      url: '/inside/inside/personal-contract/contractExamine',
      method: 'get'
    });
}
