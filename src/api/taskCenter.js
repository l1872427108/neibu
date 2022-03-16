import request from '~/utils/request/fetch';
// 每日任务根据时间查询
export function todayTimeSearch(todayTime,userId) {
      return request({
        url: `/inside/insideInfo/task/${todayTime}/${userId}`,
        method: 'get'
        });
    }
  // 增加每日任务
 export function addTask(data) {
      return request({
        url: `/inside/insideInfo/task/addTask`,
        method: 'post',
        data
        });
    }
// 删除每日任务
export function deleteTask(id) {
  return request({
    url: `/inside/insideInfo/task/${id}`,
    method: 'delete',
  })
}
// 根据任务id查询详细信息
export function taskidSearch(id) {
  return request({
    url:`/inside/insideInfo/task/getTask/${id}`,
    method:'get'
  })
}
// 修改任务
export function amendTask(data) {
  return request({
    url:`inside/insideInfo/task`,
    method:'put',
    data
  })
}
// 完成任务
export function completeTask(data) {
  return request({
    url:`inside/insideInfo/task/completeTask`,
    method:'put',
    data
  })
}
  