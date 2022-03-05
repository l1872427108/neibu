import Vue from 'vue';
/** 指令收集注册 */
const requireDirective = require.context(
    '.',
    false,
    /_directive-[\w]+\.js/
);

requireDirective.keys().forEach((fileName) => {
    const directivesConfig = requireDirective(fileName);

    const directivesName = fileName
        .replace(/^\.\//, '')
        .replace(/\.\w+$/, '')
        .split('_directive-')
        .join('');

    Vue.directive(directivesName, directivesConfig.default || directivesConfig);
});
