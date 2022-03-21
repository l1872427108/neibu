import request from '~/utils/request/fetch';

/**
 * 
 * @param {*} todayTime 日期 
 * @param {*} userId  用户id
 * @returns 
 */
export function todayTimeSearch(todayTime,userId) {
      return request({
        url: `/inside/insideInfo/task/${todayTime}/${userId}`,
        method: 'get'
        });
    }
/**
 * 
 * @param {*} data 
 * @returns 
 */
 export function addTask(data) {
      return request({
        url: '/inside/insideInfo/task/addTask',
        method: 'post',
        data
        });
    }
/**
 * 删除任务
 * @param {*} id //任务id
 * @returns 
 */
export function deleteTask(id) {
  return request({
    url: `/inside/insideInfo/task/${id}`,
    method: 'delete'
  });
}
/**
 * 根据任务id查询详细信息
 * @param {*} id //任务id 
 * @returns 
 */
export function taskidSearch(id) {
  return request({
    url: `/inside/insideInfo/task/getTask/${id}`,
    method: 'get'
  });
}
/**
 * 修改任务
 * @param {*} data 
 * @returns 
 */
export function amendTask(data) {
  return request({
    url: 'inside/insideInfo/task',
    method: 'put',
    data
  });
}
/**
 * 完成任务
 * @param {*} data 
 * @returns 
 */
export function completeTask(data) {
  return request({
    url: 'inside/insideInfo/task/completeTask',
    method: 'put',
    data
  });
}
