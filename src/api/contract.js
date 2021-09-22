import request from '~/utils/fetch';

/**
 * 查询个人所有合约
 */
export function search (id) {
  return request({
    url: `/inside/inside/personal-contract/${id}`,
    method: 'get'
  });
}


/**
 * 签约-提交审核
 */
 export function contractExamine (data) {
    return request({
      url: '/inside/inside/personal-contract/contractExamine',
      method: 'post',
      data
    });
}

/**
 * 申请解约
 */
 export function personalContract (id) {
  return request({
    url: `/inside/inside/personal-contract/contractTerminate/${id}`,
    method: 'get'
  });
}

/**
 * 详细信息
 */
 export function personalInfo (id) {
  return request({
    url: `/inside/inside/personal-contract/contract/${id}`,
    method: 'get'
  });
}


/**
 * 获取文件上传签名
 */
 export function policy () {
  return request({
    url: '/thirdService/oss/policy',
    method: 'get'
  });
}


/**
 * 上传oss
 */
 export function updateOss (formData, header) {
  return request({
    url: 'https://inside.puge.net',
    method: 'post',
    formData,
    header
  });
}

