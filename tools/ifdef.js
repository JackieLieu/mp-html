/**
 * @fileoverview 条件编译
 */
const through2 = require('through2')

/**
 * @description 条件编译
 * @param {string} platform 平台
 */
module.exports = function (platform) {
  return through2.obj(function (file, _, callback) {
    if (file.isBuffer()) {
      // 文件夹级别的处理
      if (file.relative.includes('miniprogram')) {
        // 去掉这一层
        if (platform != 'uni-app')
          file.path = file.path.replace(/(.*)[/\\]miniprogram/, '$1')
        // 不用于本平台的文件
        else
          return callback()
      } else if (file.relative.includes('uni-app')) {
        if (platform == 'uni-app')
          file.path = file.path.replace(/(.*)[/\\]uni-app/, '$1')
        else
          return callback()
      }
      // 小程序平台进行进一步处理
      if (platform != 'uni-app') {
        var content = file.contents.toString()
        /**
         * 方式1：
         * 在注释 #if(n)def xxx 和 #endif 之间的内容会根据是否定义 xxx 决定是否保留
         */
        var commentReg = /\/\*[\s\S]*?\*\/|\/\/[^\n]*|<!--[\s\S]*?-->/g, // 提取所有注释
          copy = content, // 拷贝一个副本用于搜索
          match = commentReg.exec(copy),
          stack = []
        while (match) {
          if (match[0].includes('#if'))
            stack.push([match[0], match.index])
          else if (match[0].includes('#endif')) {
            var item = stack.pop()
            if (!item)
              throw "条件编译错误：存在多余的 #endif，path:" + file.path + "，content: " + content.substr(match.index, 100)
            var def = item[0].match(/MP-[A-Z]+/gi) || [] // 取出定义条件
            var hit = false
            for (var i = 0; i < def.length; i++) {
              if (def[i] && platform == def[i].toLowerCase()) {
                hit = true // 命中
                break
              }
            }
            // 不匹配
            if ((item[0].includes('#ifdef') && !hit) || (item[0].includes('#ifndef') && hit)) {
              var fill = ''
              // 用空格填充
              for (var j = item[1] + item[0].length; j < match.index; j++) {
                if (content[j] == '\n')
                  fill += '\n'
                else
                  fill += ' '
              }
              content = content.substr(0, item[1] + item[0].length) + fill + content.substr(match.index)
            }
          }
          match = commentReg.exec(copy)
        }
        if (stack.length)
          throw "条件编译错误：存在未闭合的 #ifdef，path:" + file.path + "，content: " + content.substr(stack[0][1], 100)

        /**
         * 方式2：
         * wxml 中属性前加平台名将仅编译到该平台，如 mp-weixin:attr
         */
        if (file.extname == '.wxml') {
          content = content.replace(/([^:\s]+:[^=\s]+)\s*=\s*"(.*?)"/g, ($, $1, $2) => {
            var platforms = $1.split(':'),
              name = platforms.pop(),
              last = platforms[platforms.length - 1]
            if (last && !last.includes('mp'))
              name = platforms.pop() + ':' + name
            if (!platforms.length)
              return $
            for (var i = platforms.length; i--;) {
              if (platform == platforms[i].toLowerCase())
                break
            }
            if (i >= 0)
              return `${name}="${$2}"`
            return ''
          })
        }
        file.contents = Buffer.from(content)
      }
    }
    this.push(file)
    callback()
  })
}
