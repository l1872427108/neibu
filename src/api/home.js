import request from '~/utils/request/fetch'
/**
 * 根据用户id查询每日任务
 */
export function searchTask(userId) {
  return request({
    url: `/inside/insideInfo/task/${userId}`,
    method: 'get'
  })
}
