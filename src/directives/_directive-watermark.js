import store from '~/store'
console.log(store.getters.userInfo.nickName);


function watermark() {
  let prevDivId = 0;

  const number180 = 180;
  const names = store.getters.userInfo.nickName;
  // 生成水印
  const setWatermark = markObj => {
    // 默认设置
    const defaultObj = {
        text: names,
        angle: 25,
        color: 'rgba(0,0,0,.1)',
        fontSize: '18px',
        top: 90
    }
    Object.assign(defaultObj, markObj);
    // 角度转成负数
    defaultObj.angle = -Math.abs(defaultObj.angle);
    // 随机生成一个 id
    const id = Math.random();
    // 清除上次的水印 div[解决：窗口大小调整时（onresize方法）水印会叠加，导致颜色加深的问题]
    if(prevDivId && document.getElementById(prevDivId) !== null) {
        document.body.removeChild(document.getElementById(prevDivId));
    }
    // 记录 id
    prevDivId = id;

    // 创建画布
    const canvas = document.createElement('canvas');
    // 设置画布的长、宽
    canvas.width = 240;
    canvas.height = 180;

    const context = canvas.getContext('2d');

    // 旋转角度（以弧度计）
    context.rotate((defaultObj.angle*Math.PI)/number180);
    context.font = defaultObj.fontSize + ' 微软雅黑';
    // 设置填充绘画的颜色、渐变或者模式
    context.fillStyle = defaultObj.color;
    context.textAlign = 'left';
    context.textBaseline = 'middle';
    context.fillText(defaultObj.text, 0, canvas.height);

    const div = document.createElement('div');
    div.id = prevDivId;
    div.style.pointerEvents = 'none';
    div.style.position = 'absolute';
    div.style.top = defaultObj.top + 'px';
    div.style.left = '0px';
    div.style.zIndex = '9999';
    div.style.width = document.documentElement.scrollWidth + 'px';
    div.style.height = document.documentElement.scrollHeight + 'px';
    div.style.background = 'url('+canvas.toDataURL('image/png')+') left top repeat';
    document.body.appendChild(div);
    return prevDivId;
  }

  watermark = {
    bind: function bind(binding) {
        setWatermark(binding.value || {});
        // 监听窗口变化事件
        window.onresize = () => {
            if(prevDivId !== 0) {
                setWatermark(binding.value || {});
            }
        }
        // 监听页面滚动
        window.onscroll = () => {
            if(prevDivId !== 0) {
                setWatermark(binding.value || {});
            }
        }
    },
    unbind: function unbind() {
        document.body.removeChild(document.getElementById(prevDivId));
        prevDivId = 0;
    }
  }

  return watermark
}

export default watermark()
