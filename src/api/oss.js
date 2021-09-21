import request from '~/utils/fetch';

/*
获取秘钥
*/
export function searchQuit () {
    return request({
        url: '/thirdService/oss/policy',
        method: 'get'
    });
}
