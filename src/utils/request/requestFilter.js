import axios from 'axios';
import { requestCancelSwitch, CANCEL_REQUEST_TYPE, pendingXHRMap } from '~/config/website';

const recordRequestFn = (config) => {
    // 自定义唯一标识
    return `${config.method}${config.url}`;
};

export const addPendingXHR = (config) => {
    if (!requestCancelSwitch) return;
    const recordRequestKey = JSON.stringify({
        duplicatedKey: recordRequestFn(config),
        type: CANCEL_REQUEST_TYPE
    });
    config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
        if (recordRequestKey && !pendingXHRMap.has(recordRequestKey)) {
            pendingXHRMap.set(recordRequestKey, cancel);
        }
    });
};

export const removePendingXHR = (config) => {
    if (!requestCancelSwitch) return;
    const recordRequestKey = JSON.stringify({
        duplicatedKey: recordRequestFn(config),
        type: CANCEL_REQUEST_TYPE
    });
    if (recordRequestKey && pendingXHRMap.has(recordRequestKey)) {
        const cancel = pendingXHRMap.get(recordRequestKey);
        cancel(recordRequestKey);
        pendingXHRMap.delete(recordRequestKey);
    }
};
