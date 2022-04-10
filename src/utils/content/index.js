// 正则过滤富文本
export function richTextFormat(value) {
  // value = value.replace(/<\/?[^>]*>/g,'')
  value = value.replace(/<\/?.+?>/g, '')
  value = value.replace(/\s+/g, '')
  value = value.replace(/<br\/>/g, '\n').replace(/<br\/>/g, '\n').replace(/\s/g, '\n').replace(/[ ]|[&nbsp;]/g, '')

  if (value.length > 30) {
    return value.slice(0, 30) + '...'
  }
  return value
}

