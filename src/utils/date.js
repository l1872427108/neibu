/**
 * 日期格式化
 */
export const dateFormat = date => {
    let format = 'yyyy-MM-dd hh:mm:ss';
    if (date !== 'Invalid Date') {
        const o = {
            'M+': date.getMonth() + 1, // month
            'd+': date.getDate(), // day
            'h+': date.getHours(), // hour
            'm+': date.getMinutes(), // minute
            's+': date.getSeconds(), // second
            'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
            S: date.getMilliseconds() // millisecond
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1,
            (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(format)) {
                format = format.replace(RegExp.$1,
                    RegExp.$1.length === 1 ? o[k]
                        : ('00' + o[k]).substr(('' + o[k]).length));
            }
        }
        return format;
    }
    return '';
};

/**
 * 时间显示
 */
export function formatData (param) {
    const hour = param.getHours();
    if (hour < 6) {
		return '凌晨好';
	} else if (hour < 9) {
		return '早上好';
	} else if (hour < 12) {
		return '上午好';
	} else if (hour < 14) {
		return '中午好';
	} else if (hour < 17) {
		return '下午好';
	} else if (hour < 19) {
		return '傍晚好';
	} else if (hour < 22) {
		return '晚上好';
	}
		return '夜里好';
}


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
