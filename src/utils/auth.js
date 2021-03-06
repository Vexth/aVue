import Cookies from 'js-cookie'

const TokenKey = 'Authorization'
const UserInfo = 'UserInfo'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function GetUserInfo() {
  let user = Cookies.get(UserInfo)
  if (user === 'undefined') {
    user = undefined
  }
  return user === undefined ? user : JSON.parse(user)
}
export function setUserInfo(token) {
  return Cookies.set(UserInfo, token)
}
