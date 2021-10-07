/*
 日期
*/

export function Date (e) {
    return e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate();
}

/*
时间
*/
export function Time (e) {
  return e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + e.getHours() + ':' + e.getMinutes() + ':' + e.getSeconds();
}
