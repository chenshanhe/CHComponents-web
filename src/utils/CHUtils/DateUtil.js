import dayjs from 'dayjs'

/**
 * 解析日期快捷方式字符串
 * @param {string} str - 日期快捷方式字符串，支持 'today'、'tomorrow'、'yesterday'
 * @returns {dayjs.Dayjs|null} 返回对应的 dayjs 对象，如果输入不是支持的快捷方式则返回 null
 * @example
 * pareseShortcuts('today') // 返回今天的 dayjs 对象
 * pareseShortcuts('tomorrow') // 返回明天的 dayjs 对象
 * pareseShortcuts('yesterday') // 返回昨天的 dayjs 对象
 * pareseShortcuts('invalid') // 返回 null
 */
export function pareseShortcuts(str) {
  if ('today' === str) {
    return getTodayObj()
  }
  if ('tomorrow' === str) {
    return getTomorrowObj()
  }
  if ('yesterday' === str) {
    return getYesterdayObj()
  }
  return null
}

/**
 * 获取今天的 dayjs 对象，时间设置为当天的开始（00:00:00）
 * @returns {dayjs.Dayjs} 返回今天的 dayjs 对象
 * @example
 * getTodayObj() // 返回今天的 00:00:00 时刻的 dayjs 对象
 */
export function getTodayObj() {
  return dayjs().startOf("day");
}

/**
 * 获取明天的 dayjs 对象，时间设置为明天的开始（00:00:00）
 * @returns {dayjs.Dayjs} 返回明天的 dayjs 对象
 * @example
 * getTomorrowObj() // 返回明天的 00:00:00 时刻的 dayjs 对象
 */
export function getTomorrowObj() {
  return dayjs().add(1, "day").startOf("day");
}

/**
 * 获取昨天的 dayjs 对象，时间设置为昨天的开始（00:00:00）
 * @returns {dayjs.Dayjs} 返回昨天的 dayjs 对象
 * @example
 * getYesterdayObj() // 返回昨天的 00:00:00 时刻的 dayjs 对象
 */
export function getYesterdayObj() {
  return dayjs().subtract(1, "day").startOf("day");
}

/**
 * 检查给定的时间单位是否有效
 * @param {string} unit - 要检查的时间单位
 * @returns {boolean} 如果单位有效返回 true，否则返回 false
 * @example
 * isUnit('month') // 返回 true
 * isUnit('week') // 返回 false
 *
 * 支持的时间单位：
 * - date: 日期
 * - day: 星期
 * - month: 月份
 * - year: 年
 * - hour: 小时
 * - minute: 分钟
 * - second: 秒
 * - millisecond: 毫秒
 */
export function isUnit(unit) {
  return [
    "date",
    "day",
    "month",
    "year",
    "hour",
    "minute",
    "second",
    "millisecond",
  ].includes(unit)
}
