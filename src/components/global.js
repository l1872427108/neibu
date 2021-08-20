import Vue from 'vue';

const requireComponent = require.context(
    '.',
    true,
    // 包括 _base-  前缀的 .vue 文件
    /_Basic-[\w-]+\.vue$/
);

requireComponent.keys().forEach((fileName) => {
   
    const componentConfig = requireComponent(fileName);

 
    const componentName = fileName
   
        .replace(/^\.\/_/, '')
    
        .replace(/\.\w+$/, '')
    
        .split('-')
    
        .map((kebab) => kebab.charAt(0).toUpperCase() + kebab.slice(1))
    
        .join('');
    console.log(componentName);

    Vue.component(componentName, componentConfig.default || componentConfig);

});
