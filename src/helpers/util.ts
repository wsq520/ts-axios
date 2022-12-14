const toString = Object.prototype.toString

export function isDate(val: any): val is Date {
  return toString.call(val) === '[object Date]'
}

export function isObject(val: any): val is Object {
  // null也会返回object类型 所以要判断val不是null
  return val !== null && typeof val === 'object'
}
