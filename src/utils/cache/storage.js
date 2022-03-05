import website from '~/config/website';

const keyName = website.key + '-';

// 浏览器永久缓存
export const setStorage = (key, value) => {
  return window.localStorage.setItem(keyName + key, JSON.stringify(value));
};

// 获取缓存
export const getStorage = (key) => {
  return window.localStorage.getItem(keyName + key);
};

// 删除缓存
export const deleteStorage = (key) => {
  return window.localStorage.removeItem(keyName + key);
};

// 全部删除
export const clearStorage = () => {
  return window.localStorage.clearStorage();
};

// 浏览器临时缓存
export const Session = {
	set (key, val) {
		window.sessionStorage.setItem(keyName + key, JSON.stringify(val));
	},
	// 获取临时缓存
	get (key) {
		const json = window.sessionStorage.getItem(keyName + key);
		return JSON.parse(json);
	},
	// 移除临时缓存
	remove (key) {
		window.sessionStorage.removeItem(keyName + key);
	},
	// 移除全部临时缓存
	clear () {
		window.sessionStorage.clear();
	}
};
