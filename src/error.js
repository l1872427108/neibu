import Vue from 'vue';
import store from '~/store';
import setting from '~/setting';
import { isString, isArray } from '~/utils/validate';

const { errorLog } = setting;

function checkNeed () {
    const env = process.env.NODE_ENV;
    if (isString(errorLog)) {
        return env === errorLog;
    }
    if (isArray(errorLog)) {
        return errorLog.includes(env);
    }
    return false;
}

if (checkNeed()) {
    Vue.config.errorHandler = (err, vm, info) => {
        Vue.nextTick(() => {
            store.dispatch('logs/addErrorLog', {
                type: 'error',
                message: err.message,
                stack: err.stack,
                info
            });
        });
    };
}
