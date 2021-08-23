/**
 * 动态插入 css
 */

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
    for (let i = links.length ; i >= 0 ; i--) {
        const link = links[i];
        if (link && link.getAttribute('href') && link.getAttribute('href') === href) {
          link.parentNode.removeChild(link);
        }
    }
};