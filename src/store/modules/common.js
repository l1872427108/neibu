import {setStorage, getStorage} from '../../utils/storage';

const state = {
    language: getStorage('language') || 'zh'
};

const mutations = {
    SET_LANGUAGE (state, language) {
        state.language = language;
        setStorage('language', state.language);
    }
};

export default {
    namespaced: true,
    state,
    mutations
};