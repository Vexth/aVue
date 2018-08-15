import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    username,
    password
  }
  return request({
    url: 'https://shop.jxxykj.cn/auth/login',
    // url: 'http://localhost:8080/auth/login',
    // url: 'http://192.168.10.153:8080/auth/login',
    method: 'post',
    data
  })
  // return request({
  //   url: '/login/login',
  //   method: 'post',
  //   data
  // })
}

export function logout() {
  return request({
    url: '/login/logout',
    method: 'post'
  })
}

export function getUserInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token: token.username }
  })
}

