export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
/**
 * 地址
 */
export const validateUrl = (val) => {
    const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlRegex.test(val);
};

/**
 * 邮箱
 */
export const checkEmail = function (rule, value, callback) {
if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value) === false) {
    callback(new Error('请输入正确的邮箱'));
  } else {
    callback();
  }
};

/**
 *
 * 企业邮箱
 */
export const checkPgEmail = function (rule, value, callback) {
  if (/^([a-zA-Z0-9_-])+@puge+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value) === false) {
    callback(new Error('请填写正确的邮箱'));
  } else {
    callback();
  }
}


/* 手机号 */
export const checkPhone = (rule, value, callback) => {
  if (/^1[34578]\d{9}$/.test(value) === false) {
    callback(new Error('请输入正确的手机号'));
  } else {
    callback();
  }
};

/**
 * 判断是否为空
 */
export const isNull = val => {
  if (typeof val === 'boolean') return false;
  if (typeof val === 'number') return false;
  if (val instanceof Array) {
    if (val.length === 0) return true;
  } else if (val instanceof Object) {
    if (JSON.stringify(val) === '{}') return true;
  } else {
    if (val === 'null' || val === null || val === 'undefined' || val === undefined || val === '') return true;
    return false;
  }
  return false;
};

/*
 * 身份证号
 */
export const identity = (rule, value, callback) => {
  if (/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的身份证号'));
  }
};


/**
 * 字符串
 */
 export function isString (str) {
  if (typeof str === 'string' || str instanceof String) {
    return true;
  }
  return false;
}

/**
 * 数组
 */
export function isArray (arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  return Array.isArray(arg);
}
