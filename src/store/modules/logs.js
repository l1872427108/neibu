import { dateFormat } from '~/utils/date';
import { getStorage, setStorage } from '~/utils/storage';
const state = {
    logsList: getStorage('logsList') || []
};

const mutations = {
    ADD_LOGS (state, { type, message, stack, info }) {
        state.logsList.push(Object.assign({
            url: window.location.href,
            time: dateFormat(new Date())
        }, {
            type,
            message,
            stack,
            info: info.toString()
        }));
        setStorage('logsList', state.logsList);
    },
    CLEAR_LOGS (state) {
        state.logsList = [];
        setStorage('logsList', state.logsList);
    }
};

export default {
    namespaced: true,
    state,
    mutations
};
