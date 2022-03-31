import axios from 'axios'
import { showLoading, hideLoading } from '../load/loading'
import { Message } from 'element-ui'
import {
  Cookie,
  Key
} from '../cache/cookie'

import { contentType, needLoadingRequest, requestTimeout, CANCEL_REQUEST_TYPE } from '~/config/website'
import { addPendingXHR, removePendingXHR } from './requestFilter'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType
  }
})

service.interceptors.request.use(params => {
  removePendingXHR(params)
  addPendingXHR(params)
  const config = {
    ...params
  }
  config.headers.Authorization = `Bearer ${Cookie.get(Key.accessTokenKey).replace(/"/g, '')}`
  const needLoading = () => {
    let status = true
    needLoadingRequest.some(item => {
      if (item !== config.url) {
        status = false
      }
    })
    return status
  }
  if (needLoading()) {
    showLoading()
  }
  // console.log(config);
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use(response => {
  hideLoading()
  const res = response.data
  if (res.code !== 20000) {
    Message({
      message: res.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(res.message || 'Error')
  }
  return res
},
error => {
  // 如果是取消请求类型则忽略异常处理
  hideLoading()
  let isErrorType
  try {
    const errorType = (JSON.parse(error.message) || {}).type
    isErrorType = errorType === CANCEL_REQUEST_TYPE
  } catch (error) {
    isErrorType = false
  }
  const response = error.response
  if (!isErrorType) {
    // eslint-disable-next-line
        if (response.status === 401 && response.data.code === 1401) {
      let isLock = true
      if (isLock && Cookie.get(Key.refreshTokenKey)) {
        // 有刷新令牌
        isLock = false
        window.location.href = `${process.env.VUE_APP_AUTH_URL}/refresh?redirectURL=${window.location.href}`
      } else {
        window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`
      }
      return Promise.reject(response.data.message || 'Error')
    }
    Message({
      message: response.data.message || 'Error',
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(response.data.message || 'Error')
  }
})

export default service
