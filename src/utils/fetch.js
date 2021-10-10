import axios from 'axios';
import { showLoading, hideLoading } from './loading';
import { Message, Notification } from 'element-ui';
import {
    Cookie,
    Key
} from './cookie';

import { contentType, needLoadingRequest, messageDuration, requestTimeout } from '~/config/website';


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: requestTimeout,
    headers: {
        'Content-Type': contentType
    }
});

service.interceptors.request.use(params => {
    const config = {
        ...params,
        url: `${params.url}`
    };
    config.headers.Authorization = `Bearer ${Cookie.get(Key.accessTokenKey).replace(/"/g, '')}`;
    const needLoading = () => {
        let status = true;
        needLoadingRequest.some(item => {
            if (item !== config.url) {
                status = false;
            }
        });
        return status;
    };
    if (needLoading()) {
        showLoading();
    }
    console.log('我是请求拦截器', config);
    return config;
}, error => {
    console.log('我是请求拦截器的error', error);
    return Promise.reject(error);
});

const errorMsg = message => {
    return Message({
        message: message,
        type: 'error',
        duration: messageDuration
    });
};

const errNotification = (
    title = null,
    message = null,
    type = 'error',
    position = 'bottom-left',
    duration = messageDuration
) => {
    Notification({
        title,
        message,
        type,
        position,
        duration
    });
};

service.interceptors.response.use(response => {
    hideLoading();
    const res = response.data;
    if (res.code !== 20000) {
        Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(res.message || 'Error');
    }
    console.log('我是响应拦截器', response);
        return res;
},
error => {
    hideLoading();
    // eslint-disable-next-line
    console.log('err' + error); // for debug
    console.log('我是请求拦截器的error', error);
    // const {} =
    if (error.response && error.response.status === 401 && error.response.data.code && error.response.data.code === 1401) {
        let isLock = true;
        if (isLock && Cookie.get(Key.refreshTokenKey)) {
            // 有刷新令牌
            isLock = false;
            window.location.href = `${process.env.VUE_APP_AUTH_URL}/refresh?redirectURL=${window.location.href}`;
        } else {
            window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`;
        }
        return Promise.reject(error.message || 'Error');
    }
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    });
    return Promise.reject(error);
});


export default service;
