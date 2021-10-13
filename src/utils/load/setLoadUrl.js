const iconfontVersion = ['2758535_xlk1xze9uf'];
const iconfontUrl = '//at.alicdn.com/t/font_$key.css';
const jsUrlList = [];

const loadStyle = (url) => {
    const link = document.createElement('link');
    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = url;
    const head = document.getElementsByTagName('head')[0];
    head.appendChild(link);
};

const loadJs = (url) => {
    const link = document.createElement('script');
    link.src = url;
    document.body.appendChild(link);
};

export function setCss () {
    if (iconfontVersion.length <= 0) return false;
    iconfontVersion.forEach(ele => {
        loadStyle(iconfontUrl.replace('$key', ele));
    });
}

export function setJs () {
    if (jsUrlList.length <= 0) return false;
    jsUrlList.map((v) => {
        loadJs(v);
    });
}

const setExecuteFun = {
    cssCdn: () => {
        setCss();
    },
    jsCdn: () => {
        setJs();
    }
};

export default setExecuteFun;
