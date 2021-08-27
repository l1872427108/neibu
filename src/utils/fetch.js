import axios from 'axios';
import { getStorage } from './storage';
import { showLoading, hideLoading } from './loading';
import { Message } from 'element-ui';
import qs from 'qs';

const service = axios.create({
    baseURL: process.env.BASE_URL, // url = base url + request url
    timeout: 5000
});


service.interceptors.request.use(params => {
    console.log(params);
    showLoading();
    const config = {
        ...params,
        url: `${params.url}`,
        headers: {
            'Access-Token': getStorage('token')
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
        return Promise.reject(new Error(res.message || 'Error'));
    }
        return res;
},
error => {
    hideLoading();
    console.log('err' + error); // for debug
    Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
    });
    return Promise.reject(error);
});

export const get = (url, config = {}, loading = true) => {
    if (loading) {
        showLoading();
    }
    return axios.get(url, config);
};


export default service;
