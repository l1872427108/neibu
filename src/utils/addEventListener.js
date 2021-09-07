import ResizeObserver from 'resize-observer-polyfill';

const isServer = typeof window === 'undefined';


/*  窗口缩放执行回调 */
const resizeHandler = function (entries) {
    for (const entry of entries) {
      const listeners = entry.target.__resizeListeners__ || [];
      if (listeners.length) {
        listeners.forEach((fn) => {
          fn();
        });
      }
    }
};


/* 添加尺寸改变时事件监听 */
export const addResizeListener = function (element, fn) {
    if (isServer) return;
    if (!element.__resizeListeners__) {
      element.__resizeListeners__ = [];
      element.__ro__ = new ResizeObserver(resizeHandler);
      element.__ro__.observe(element);
    }
    element.__resizeListeners__.push(fn);
};


/* 移除尺寸改变时事件监听 */
export const removeResizeListener = function (element, fn) {
    if (!element || !element.__resizeListeners__) return;
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.__ro__.disconnect();
    }
};
