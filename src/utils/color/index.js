// 储存一些好看的颜色，随机生成颜色。可用于tag的color配色
export function randomColor() {
  const colorList = ['pink', '#2db7f5', 'orange', '#108ee9', 'cyan', '#f4364f', 'blue', 'purple', '#f50', 'red', '#87d068', 'green', '#1c9efb']
  return colorList[Math.floor(Math.random() * colorList.length)]
}
