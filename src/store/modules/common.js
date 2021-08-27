import {setStorage, getStorage} from '../../utils/storage';

const state = {
    language: getStorage('language') || 'zh',
    colorName: getStorage('themeName') || 'theme-default',
    isCollapse: false,  // 是否折叠
    isFullScren: false
};

const mutations = {
    SET_LANGUAGE (state, language) {
        state.language = language;
        setStorage('language', state.language);
    },
    SET_COLOR_NAME: (state, colorName) => {
        state.colorName = colorName;
        setStorage('colorName', state.colorName);
    },

    SET_COLLAPSE: (state) => {
        state.isCollapse = !state.isCollapse;
    },
    
    SET_FULLSCREN: (state) => {
        state.isFullScren = !state.isFullScren;
    }
};

export default {
    namespaced: true,
    state,
    mutations
};