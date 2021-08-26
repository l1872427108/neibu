import {setStorage, getStorage} from '../../utils/storage';

const state = {
    language: getStorage('language') || 'zh',
    colorName: getStorage('themeName') || 'theme-default',
    isCollapse: true  // 是否折叠
};

const mutations = {
    SET_LANGUAGE (state, language) {
        state.language = language;
        setStorage('language', state.language);
    },
    SET_COLOR_NAME: (state, colorName) => {
        state.colorName = colorName;
        setStorage('colorName', state.colorName);
    }
};

export default {
    namespaced: true,
    state,
    mutations
};