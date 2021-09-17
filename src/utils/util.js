export function param2Obj (url) {
    const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ');
    if (!search) {
      return {};
    }
    const obj = {};
    const searchArr = search.split('&');
    searchArr.forEach(v => {
      const index = v.indexOf('=');
      if (index !== -1) {
        const name = v.substring(0, index);
        const val = v.substring(index + 1, v.length);
        obj[name] = val;
      }
    });
    return obj;
}

/**
 * 动态插入 css
 */

export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}

export const loadStyle = (url) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
};

/**
 * 动态删除 css
 */
export const removeCss = (href) => {
    const links = document.getElementsByTagName('link');
    for (let i = links.length; i >= 0; i--) {
        const link = links[i];
        if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
          link.parentNode.removeChild(link);
        }
    }
};

/**
 * 设置主题
 */
export const setTheme = (name) => {
    document.body.className = name;
};

/**
 * 判断屏幕
 */
export const getScreen = () => {
    const width = document.body.clientWidth;
    if (width >= 1200) {
        return 3; // 大
    } else if (width >= 992) {
        return 2; //  中
    } else if (width >= 768) {
        return 1; // 小
    }
    return 0; // 超小
};


/**
 * 表单序列化
 */
export const serialize = data => {
    const list = [];
    Object.keys(data).forEach(ele => {
        list.push(`${ele}=${data[ele]}`);
    });
    return list.join('&');
};


export const fullscreenEnable = () => {
    const isFullscreen = document.isFullscreen || document.mozIsFullScreen || document.webkitIsFullScreen;
    return isFullscreen;
};

/**
 * 判断是否全屏
 */
export const fullscreen = () => {
    if (fullscreenEnable()) {
        exitFullScreen();
    } else {
        reqFullScreen();
    }
};

export const exitFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.exitFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.webkitCancelFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.mozCancelFullScreen();
    }
};

export const reqFullScreen = () => {
    if (document.documentElement.requestFullScreen) {
        document.documentElement.requestFullScreen();
    } else if (document.documentElement.webkitRequestFullScreen) {
        document.documentElement.webkitRequestFullScreen();
    } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
    }
};

/**
 * esc监听全屏
 */
export const listenerfullscreen = (callback) => {
    function listen () {
        callback();
    }

    document.addEventListener('fullscreenchange', function () {
        listen();
    });
    document.addEventListener('mozfullscreenchange', function () {
        listen();
    });
    document.addEventListener('webkitfullscreenchange', function () {
        listen();
    });
    document.addEventListener('msfullscreenchange', function () {
        listen();
    });
};


/**
 * 浏览器判断是否全屏
 */
 export const fullscreenToggel = () => {
    if (fullscreenEnable()) {
        exitFullScreen();
    } else {
        reqFullScreen();
    }
};


/**
 * 下载
 */
export const download = (link, fileName) => {
    if (!fileName) {
        fileName = link.slice(link.lastIndexOf('/') + 1);
    }
    const eleLink = document.createElement('a');
    eleLink.download = fileName;
    eleLink.style.display = 'none';
    eleLink.href = link;
    document.body.appendChild(eleLink);
    eleLink.click();
    document.body.removeChild(eleLink);
};
