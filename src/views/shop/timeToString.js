function tran(n) {
  return n < 10 ? '0' + n : n
}

export default function formatDate(timestamp) {
  const time = new Date(timestamp)
  const year = time.getYear()
  const month = time.getMonth() + 1
  const date = time.getDate()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()
  return year + '-' + tran(month) + '-' + tran(date) + '  ' + tran(hour) + ':' + tran(minute) + ':' + tran(second)
}
