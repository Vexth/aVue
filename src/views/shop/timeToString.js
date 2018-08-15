function tran(n) {
  return n < 10 ? '0' + n : n
}

export default function formatDate(timestamp, type='yyyy-mm-dd HH:MM:SS') {
  const time = new Date(timestamp)
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()
  if (type === 'yyyy-mm-dd') {
    return year + '-' + tran(month) + '-' + tran(date)
  } else {
    return year + '-' + tran(month) + '-' + tran(date) + '  ' + tran(hour) + ':' + tran(minute) + ':' + tran(second)
  }
}
