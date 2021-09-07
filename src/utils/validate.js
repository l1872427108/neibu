export const validateUrl = (val) => {
    const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlRegex.test(val);
};

/**
 * 邮箱
 */
export const isEmail = (s) => {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
};


/**
 * 手机号码
 * @param {*} s
 */
export const isMobile = (s) => {
    return /^1[0-9]{10}$/.test(s);
};

/**
 * 电话号码
 * @param {*} s
 */
export const isPhone = (s) => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
};

/**
 * URL地址
 * @param {*} s
 */
export const isURL = (s) => {
    return /^http[s]?:\/\/.*/.test(s);
};


/**
 * 判断是否为空
 */
export const validatenull = (val) => {
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

/**
 * 判断手机号码是否正确
 */
 export function isvalidatemobile (phone) {
    const list = [];
    let result = true;
    let msg = '';
    const isPhone = /^0\d{2,3}-?\d{7,8}$/;
    // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
    if (!validatenull(phone)) {
        if (phone.length === 11) {
            if (isPhone.test(phone)) {
                msg = '手机号码格式不正确';
            } else {
                result = false;
            }
        } else {
            msg = '手机号码长度不为11位';
        }
    } else {
        msg = '手机号码不能为空';
    }
    list.push(result);
    list.push(msg);
    return list;
}
export const validateUrl = val => {
    const urlRegex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlRegex.test(val);
  };
  
  /**
   * 邮箱
   */
  export const isEmail = s => {
    return /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(s);
  };
  
  /**
   * 手机号码
   * @param {*} s
   */
  export const isMobile = s => {
    return /^1[0-9]{10}$/.test(s);
  };
  
  /**
   * 电话号码
   * @param {*} s
   */
  export const isPhone = s => {
    return /^([0-9]{3,4}-)?[0-9]{7,8}$/.test(s);
  };
  
  /**
   * URL地址
   * @param {*} s
   */
  export const isURL = s => {
    return /^http[s]?:\/\/.*/.test(s);
  };
  
  /**
   * 判断是否为空
   */
  export const validatenull = val => {
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
  
  /**
   * 判断手机号码是否正确
   */
  export function isvalidatemobile(phone) {
    const list = [];
    let result = true;
    let msg = '';
    const isPhone = /^0\d{2,3}-?\d{7,8}$/;
    // 增加134 减少|1349[0-9]{7}，增加181,增加145，增加17[678]
    if (!validatenull(phone)) {
      if (phone.length === 11) {
        if (isPhone.test(phone)) {
          msg = '手机号码格式不正确';
        } else {
          result = false;
        }
      } else {
        msg = '手机号码长度不为11位';
      }
    } else {
      msg = '手机号码不能为空';
    }
    list.push(result);
    list.push(msg);
    return list;
  }
  /* 手机号*/
  export const checkPhone = function(rule, value, callback) {
    if (/^1[34578]\d{9}$/.test(value) == false) {
      callback(new Error('请输入正确的手机号'));
    } else {
      callback();
    }
  };
  /* 身份证号 */
  export const sfz = function(rule, value, callback) {
    if (
      /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$)/.test(
        value,
      ) == false
    ) {
      callback(new Error('请输入正确的身份证号'));
    } else {
      callback();
    }
  }
  /* 邮箱 */
  export const email = function (rule, value, callback) {
      if (/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value) == false) {
          callback(new Error('请输入正确的邮箱'));
        } else {
          callback();
        }
      };