export const AsyncComponent = (path) => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import(path),
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 200,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})
