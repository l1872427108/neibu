import request from '~/utils/request/fetch';
/**
 * 查看面试人
 */
export function searchInterview (id) {
  return request({
    url: `/inside/inside/distribution/userList/${id}`,
    method: 'get'
  });
}
/**
 * 根据报名者 id 获取步骤
 */
export function getInterviewStep(id) {
  return request({
    url: `/inside/inside/step/getSteps/${id}`,
    method: 'get'
  })
}
/**
 * 修改面试状态
 * @param {*} id
 * @param {*} applyId
 * @param {*} status
 * @returns
 */
export function updateState(id, applyId, status) {
  return request({
    url: `/inside/inside/step/updateState/${id}/${applyId}/${status}`,
    method: 'get'
  })
}

export function setEvaluate(data) {
  return request({
    url: `/inside/inside/step/step`,
    method: 'put',
    data
  })
}
