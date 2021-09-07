import Vue from 'vue';

const isPro = process.env.NODE_ENV = 'production';
const isEnv = process.env.NODE_ENV === 'development';

// Vue.config.silent = isPro;

Vue.config.devtools = true;

Vue.config.ignoredElements = [''];

Vue.config.productionTip = true;

Vue.config.performance = true;


Vue.config.keyCodes = {};
