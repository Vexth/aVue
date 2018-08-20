/**
 * Created by Vexth on 17/3/8.
 */
function tran(n) {
  return n < 10 ? '0' + n : n
}

export function createUniqueString() {
  const timestamp = +new Date() + ''
  const randomNum = parseInt((1 + Math.random()) * 65536) + ''
  return (+(randomNum + timestamp)).toString(32)
}

export function createImageNameString() {
  const time = new Date()
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()
  return year + tran(month) + tran(hour) + tran(minute) + tran(second) + '_' + createUniqueString()
}

