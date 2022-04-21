import request from '~/utils/request/fetch'
/**
 * 查询公告详情
 */
export function getLookAllBulletin(data) {
  return request({
    url: '/inside/inside/bulletin/lookAllBulletin',
    method: 'post',
    data
  })
}
