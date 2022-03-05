module.exports = {
    // 一行最多120个字符
    "printWidth": 120,
    // 在语句末尾加封号
    "semi": true,
    // 转为单引号
    "singleQuote": true,
    // 多行打印尾随逗号。 
    "trailingComma": "all",
    // 在对象文字中的括号之间打印空格
    "bracketSpacing": true,
    // 在单独的箭头函数参数周围包括括号(x)
    "arrowParens": "always",
    // 指定每个缩紧级别的空格数
    "tabWidth": 2,
    // 使用制表符而不是空格缩进行
    "useTabs": true,
    // 这两个选项可用于格式化以给定字符偏移量（分别包括和不包括）开始和结束的代码
	"rangeStart": 0,
	"rangeEnd": Infinity,
    // 指定要使用的解析器，不需要写文件开头的 @prettier
	"requirePragma": false,
	// 不需要自动在文件开头插入 @prettier
	"insertPragma": false,
    // 使用默认的折行标准
	"proseWrap": 'preserve',
    // 指定HTML文件的全局空格敏感度 css\strict\ignore
	"htmlWhitespaceSensitivity": 'css',
	// Vue文件脚本和样式标签缩进
	"vueIndentScriptAndStyle": false,
}