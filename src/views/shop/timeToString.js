function tran(n) {
  return n < 10 ? '0' + n : n
}

export default function formatDate(timestamp) {
  // console.log(timestamp)
  const time = new Date(timestamp)
  // console.log(time)
  const year = time.getFullYear()
  // console.log(year)
  const month = time.getMonth() + 1
  const date = time.getDate()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()
  return year + '-' + tran(month) + '-' + tran(date) + '  ' + tran(hour) + ':' + tran(minute) + ':' + tran(second)
}
