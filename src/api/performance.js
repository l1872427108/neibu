import request from '~/utils/request/fetch'

/**
 * 申报绩效
 * @returns
 */
export function addDeclare(data) {
  return request({
    url: '/inside/inside/declare/addDeclare',
    method: 'post',
    data
  })
}

/**
 * 根据申请人id、审批状态查询申报的绩效
 * @param {*} userId
 * @returns
 */
export function allPerformance(approvalState, userId) {
  return request({
    url: `/inside/inside/declare/stateSelect/${approvalState}/${userId}`,
    method: 'get'
  })
}

/**
 * 查看绩效项
 * @param {*} id
 * @returns
 */
export function selectAllPerformance() {
  return request({
    url: '/inside/inside/Bperformance/selectAllperformance',
    method: 'get'
  })
}

/**
 * 查看绩效还可以申报几次
 * @param {*} performanceId
 * @param {*} userId
 * @returns
 */
export function getNums(performanceId, userId) {
  return request({
    url: `/inside/inside/declare/getNums/${performanceId}/${userId}`,
    method: 'get'
  })
}

/**
 * 查看审批人
 * @returns
 */
export function getApprove() {
  return request({
    url: '/inside/inside/Bapprover/selectAllApprover',
    method: 'get'
  })
}

/**
 * 绩效申报-审批失败-删除绩效
 * @param {*} id
 * @returns
 */
export function deleteDeclare(id) {
  return request({
    url: `/inside/inside/declare/${id}`,
    method: 'delete'
  })
}

/**
 * 根据审批人id查询要审批的绩效
 * @param {*} approverId
 * @returns
 */
export function selectDeclare(approverId) {
  return request({
    url: `/inside/inside/declare/selectDeclare/${approverId}`,
    method: 'get'
  })
}

/**
 * 修改绩效审批状态
 * @param {*} id
 * @param {*} approvalState
 * @returns
 */
export function updateApprovalState(id, approvalState) {
  return request({
    url: `/inside/inside/declare/updateApprovalState/${id}/${approvalState}`,
    method: 'put'
  })
}

/**
 * 根据主键id查询申报绩效的详细信息
 * @param {*} id
 * @returns
 */
export function selectPerformance(id) {
  return request({
    url: `/inside/inside/declare/selectDeclares/${id}`,
    method: 'get'
  })
}

/**
 * 根据申请人id查询目前分数
 * @param {*} declareId
 * @returns
 */
export function getMonthScore(declareId) {
  return request({
    url: `/inside/inside/declare/selectMonthScore/${declareId}`,
    method: 'get'
  })
}

/**
 * 根据年月查询所有人申报的绩效项
 * @param {*} month
 * @returns
 */
export function getMonthPerformance(month) {
  return request({
    url: `/inside/inside/performance-nums/selectPerformance/${month}`,
    method: 'get'
  })
}

/**
 * 模糊查询申请人
 * @param {*} data
 * @returns
 */
export function getQueryDeclare(data) {
  return request({
    url: '/inside/inside/declare/queryDeclare',
    method: 'post',
    data
  })
}
