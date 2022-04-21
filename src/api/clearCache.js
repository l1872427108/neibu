import request from '~/utils/request/fetch'

/**
 * 清除测试环境VPN缓存
 */
export function clearTestCache() {
  return request({
    url: `/inside/inside/ClearCache/ClearIntranetVPN`,
    method: 'get'
  })
}


/**
 * 清除开发环境VPN缓存
 */
 export function clearProdCache() {
  return request({
    url: `/inside/inside/ClearCache/ClearProdVPN`,
    method: 'get'
  })
}
