const Mock = require('mockjs');
const { param2Obj } = require('../src/utils');
// 设置拦截ajax请求的相应时间
Mock.setup({
  timeout: '200-600'
});

let configArray = [];

// 使用webpack的require.context()遍历所有mock文件
const files = require.context('.', true, /\.js$/);
files.keys().forEach((key) => {
  if (key === './index.js') return;
  configArray = configArray.concat(files(key));
});

function XHR2ExpressReqWrap (respond) {
  return function (options) {
    let result = null;
    if (respond instanceof Function) {
      const { body, type, url } = options;
      // https://expressjs.com/en/4x/api.html#req
      result = respond({
        method: type,
        body: JSON.parse(body),
        query: param2Obj(url)
      });
    } else {
      result = respond;
    }
    return Mock.mock(result);
  };
}
for (const i of configArray) {
  Mock.mock(new RegExp(i.url), i.type || 'get', XHR2ExpressReqWrap(i.response));
}
module.exports = {
  configArray
};
