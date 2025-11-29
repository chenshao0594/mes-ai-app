// 获取日期和当前日期的相差的时间
// TODO @芋艿：后续的时间封装。目前和 time.ts 有一定的重叠
export const getTimeDifference = (inputTimestamp: number): string => {
  // 获取当前日期和时间
  const currentDate = new Date()
  // 将输入的时间戳转换为 Date 对象
  const inputDate = new Date(inputTimestamp)

  // 计算两个日期之间的毫秒数差值
  const differenceInMilliseconds = Math.abs(
    currentDate.getTime() - inputDate.getTime()
  )

  // 将毫秒数转换为秒数
  const differenceInSeconds = differenceInMilliseconds / 1000

  // 计算天数、小时数和分钟数
  const days = Math.floor(differenceInSeconds / (60 * 60 * 24))
  const hours = Math.floor((differenceInSeconds % (60 * 60 * 24)) / (60 * 60))
  const minutes = Math.floor((differenceInSeconds % (60 * 60)) / 60)

  // 根据相差的时间长度返回不同的结果
  if (days > 0) {
    return `${days}天`
  } else if (hours > 0) {
    return `${hours}小时`
  } else {
    return `${minutes}分钟`
  }
}
// 将时间戳格式化为“MM-DD HH:MM”
export const formatTimestamp = (timestamp: number): string => {
  // 创建一个新的Date对象，使用传入的时间戳（毫秒）

  const date = new Date(timestamp) // 假设时间戳是秒，如果是毫秒则不需要乘以1000

  // 获取月、日、小时、分钟

  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份是从0开始的，所以需要加1

  const day = String(date.getDate()).padStart(2, '0')

  const hours = String(date.getHours()).padStart(2, '0')

  const minutes = String(date.getMinutes()).padStart(2, '0')

  // 按照要求的格式组合字符串

  return `${month}-${day}  ${hours}:${minutes}`
}
// 将时间戳格式化为“YY-MM-DD HH:MM”
export const formatTimestampToymd = (timestamp: number): string => {
  // 创建一个新的 Date 对象
  const date = new Date(timestamp)

  // 获取各个部分的时间
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // 月份从 0 开始，需要加 1，并且补 0
  const day = String(date.getDate()).padStart(2, '0') // 数字补 0
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  console.log(year)

  // 组合成指定格式的字符串
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
// 将时间戳列表格式化为“YY-MM-DD HH:MM”的列表
export const formatTimestamps = (timestamps: number[]): string[] => {
  // 使用 map 方法遍历时间戳列表，并调用 formatTimestamp 函数来格式化每个时间戳
  return timestamps.map((timestamp) => formatTimestampToymd(timestamp))
}
