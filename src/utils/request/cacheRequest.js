const dataCache = new Map();

async getWares () {
    let key = 'wares';
    let data = dataCache.get(key);
    if (!data) {
        const res = await request.get('/');
        dataCache.set(key,data);
    }
    return data;
}

// 利用map 对象对数据进行缓存， 之后调用从 map 对象来取数据。


// getWares().then( ... )  
// getWares.then();

// 数据缓存


export function queryAll (queryApiName) {
    const promiseCache = new Map()
    const queryIsArray = Array.isArray(queryApiName);
    const apis = queryIsArray ? queryApiName : [queryApiName];
    const promiseApi = [];
    apis.forEach(api => {
        let promise = promiseCache.get(api);
        if (promise) {
            promise.push(promise);
        } else {
            // 进行请求
            promise = request.get(querys[api].then(res => {
                // 操作res
            })).catch(error => {
                promiseCache.delete(api);
                return Promise.reject(error);
            })
            promiseCache.set(api, promise);
            promiseCache.push(promise);
        }
    })
    return Promise.all(promiseApi).then(res => {
        return queryIsArray ? res : res[0];
    })
}

// 该方案是同时获取多个服务器数据的方式， 可以同时获取多个数据进行操作。


// 添加时间有关的缓存
// 缓存是有危害的， 我们在知道修改了数据的情况下， 直接把 cache 删除即可， 可以向服务器进行请求。 避免前端显示旧的数据。
// 该类可以存储 promise 或者 data
class ItemCache {
    constructor (data, timeout) {
        this.data = data
        this.timeout = timeout
        this.cacheTime = (new Date()).getTime
    }
}