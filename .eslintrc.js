module.exports = {
    "root": true,
    "parserOptions": {
        "parser": 'babel-eslint',
        "sourceType": 'module'
      },
    "env": {
        "browser": true,
        "node": true,
        "es6": true,
    },
    "extends": ['plugin:vue/recommended', 'eslint:recommended'],
    "rules": {
		'prefer-promise-reject-errors': 0,
		'space-unary-ops': 0,
		'no-unused-expressions': 0,
		'no-useless-return': 0,
		'standard/no-callback-literal': 0,
		'import/first': 0,
		'import/export': 0,
		'no-mixed-operators': 0,
		'no-use-before-define': 0,
		"no-console": process.env.NODE_ENV === 'production' ? 2 : 0,//禁止使用console
		'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
		'one-var': 0, // 不限制变量一起声明
		"no-alert": 'error',//禁止使用alert confirm prompt
		"no-caller": 'warn',//禁止使用arguments.caller或arguments.callee
		"indent": [ 'off', 2 ],  // 总是 2个空格
		"eqeqeq": [ 'error', 'always' ],  // 总是全等于 === !==
		"semi": [ 'error', 'always' ],  // 总是带分号
		"no-multiple-empty-lines": ['error', {"max": 2}], // 空行最多不超过10行
		"no-mixed-spaces-and-tabs": ['error'],  // 禁止混用tab 和 空格
		"no-unused-vars": ["off", {"vars": "local", "args": "none"}],
		"space-before-function-paren": "error",   // 函数左括号忽略
		'comma-spacing': [2, {'before': false, 'after': true}],
		'no-redeclare': [2, {builtinGlobals: true}],  // 不允许重复声明变量
		'no-var': 2, // 不允许使用var变量,
		'no-tabs': 0,    // 允许使用tab
		"no-const-assign": 2,//禁止修改const声明的变量
		"no-constant-condition": 2,//禁止在条件中使用常量表达式 if(true) if(1)
		"no-dupe-args": 2,//函数参数不能重复
		"no-dupe-keys": 2,//在创建对象字面量时不允许键重复 {a:1,a:1}
		"no-duplicate-case": 2,//switch中的case标签不能重复
		"no-else-return": 2,//如果if语句里面有return,后面不能跟else语句
		"no-empty": 2,//块语句中的内容不能为空
		"no-eval": 1,//禁止使用eval
		"no-inline-comments": 0,//禁止行内备注
		// "quote-props":[2, "always"],//对象字面量中的属性名是否强制双引号
		"camelcase": 2,//强制驼峰法命名
		"accessor-pairs": 0,//在对象中使用getter/setter
    }
}