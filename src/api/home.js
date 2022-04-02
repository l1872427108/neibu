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

/**
 * 轮播图查询
 * @returns
 */
export function searchCarousel() {
  return request({
    url: `/inside/inside/inspirational-picture/selectRandomPicture`,
    method: 'get'
  })
}

/**
 * 微博热搜
 * @returns
 */
export function weiboHotSearch() {
  return request({
    url: '/inside/inside/homepage/getWeiBoTopApi',
    method: 'post'
  })
}
