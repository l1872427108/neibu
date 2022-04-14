import request from '~/utils/request/fetch';

/** 
 * 查询全部收藏所有的文件
 * @param {*} userId  用户Id
 * */ 
 export function queryAlCollectionlFiles(userId) {
    return request({
      url: `/inside/inside/user-file/searchAllUserFile/${userId}`,
      method: 'get'
      });
  }
  /**
 * 添加收藏
 */
 export function addCollection(data) {
    return request({
      url: '/inside/inside/user-file/saveUserFile',
      method: 'post',
      data
      });
  }
/**
 * 取消收藏
 * @param {*} id  文件id
 */
 export function cancelCollection(data) {
    return request({
      url: '/inside/inside/user-file/removeUserFile',
      method: 'delete',
      data
    });
  }
/**
 * 下载文件
 * @param {*} id  文件id
 */
export function downloadFile(id) {
    return request({
        url:`/inside/inside/file/downloadFile/${id}`,
        method:'get'
    })
}
/**
 * 搜索栏条件查询带分页
 */
export function queryPaging(data) {
    return request({
        url:'/inside/inside/file/search',
        method:'post',
        data
    });
}