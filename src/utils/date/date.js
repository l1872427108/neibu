/**
 * 日期格式化
 */
export const dateFormat = date => {
  let format = 'yyyy-MM-dd hh:mm:ss'
  console.log(date.getMinutes())
  if (date !== 'Invalid Date') {
    const o = {
      'M+': date.getMonth() + 1, // month
      'd+': date.getDate(), // day
      'h+': date.getHours(), // hour
      'm+': date.getMinutes(), // minute
      's+': date.getSeconds(), // second
      'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
      S: date.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1,
        (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (const k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1,
          RegExp.$1.length === 1 ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  }
  return ''
}

/**
 * 时间显示
 */
export function formatData(param) {
  const hour = param.getHours()
  if (hour < 6) {
    return 'hour6'
  } else if (hour < 9) {
    return 'hour9'
  } else if (hour < 12) {
    return 'hour12'
  } else if (hour < 14) {
    return 'hour14'
  } else if (hour < 17) {
    return 'hour17'
  } else if (hour < 19) {
    return 'hour19'
  } else if (hour < 22) {
    return 'hour22'
  }
  return 'hour24'
}

/*
 日期
*/

// export function Date (e) {
//     return e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate();
// }

/*
时间
*/
// export function Time (e) {
//   return e.getFullYear() + '-' + (e.getMonth() + 1) + '-' + e.getDate() + ' ' + e.getHours() + ':' + e.getMinutes() + ':' + e.getSeconds();
// }

export function toTime(timestamp) {
  const date = new Date(timestamp)// 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() + ' '
  return Y + M + D
}


export function datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
  var dateSpan,
      tempDate,
      iDays;
  sDate1 = Date.parse(sDate1);
  sDate2 = Date.parse(sDate2);
  dateSpan = sDate2 - sDate1;
  dateSpan = Math.abs(dateSpan);
  iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
  return iDays
};
