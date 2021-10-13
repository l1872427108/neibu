const myPlugins = [];
if (process.env.NODE_ENV === 'production') {
    myPlugins.push('transform-remove-console');
}
module.exports = {
    plugins: [...myPlugins],
    // ['component', {
    //     libraryName: 'element-ui',
    //     styleLibraryName: 'theme-chalk'
    // }]],
    presets: [
        '@vue/cli-plugin-babel/preset'
    ]
};
