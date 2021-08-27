import Vue from 'vue';

// const isPro = process.env.NODE_ENV = 'production';
const isEnv = process.env.NODE_ENV === 'development';

Vue.config.silent = isEnv;

Vue.config.devtools = isEnv;

Vue.config.ignoredElements = [''];

Vue.config.productionTip = isEnv;

Vue.config.performance = true;


Vue.config.keyCodes = {};
