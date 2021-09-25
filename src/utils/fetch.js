import axios from 'axios';
import { getStorage } from './storage';
import { showLoading, hideLoading } from './loading';
import { Message } from 'element-ui';
import qs from 'qs';
import {
    Cookie,
    Key
} from './cookie';


const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API // url = base url + request url
    // timeout: 5000
});

service.interceptors.request.use(params => {
    showLoading();
    const config = {
        ...params,
        url: `${params.url}`,
        headers: {
            Authorization: `Bearer ${Cookie.get(Key.accessTokenKey).replace(/"/g, '')}`
        }
    };
    if (config.method === 'get') {
        config.paramsSerializer = (params) => {
            return qs.stringify(params, { arrayFormat: 'repeat' });
        };
    }
    return config;
});

service.interceptors.response.use(response => {
    hideLoading();
    const res = response.data;
    if (res.code !== 20000) {
        Message({
            message: res.message || 'Error',
            type: 'error',
            duration: 5 * 1000
        });
        // if(res.code === 50008 || res.code === 50012) {

        // }
        // return Promise.reject(new Error(res.message || 'Error'));
    }
        return res;
},
error => {
    hideLoading();
    console.log('err' + error); // for debug

    if (error.response && error.response.status !== 401) {
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        });
        return Promise.reject(error);
    }

    let isLock = true;

    if (isLock && Cookie.get(Key.refreshTokenKey)) {
        // 有刷新令牌
        isLock = false;

        window.location.href = `${process.env.VUE_APP_AUTH_URL}/refresh?redirectURL=${window.location.href}`;
    } else {
        window.location.href = `${process.env.VUE_APP_AUTH_URL}?redirectURL=${window.location.href}`;
    }
    return Promise.reject('令牌过期，重新认证');
});

export const get = (url, config = {}, loading = true) => {
    if (loading) {
        showLoading();
    }
    return axios.get(url, config);
};


export default service;
