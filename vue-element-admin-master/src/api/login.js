import request from '@/utils/request'

export function loginByUsername(username, password) {
  const data = {
    'grant_type': 'password',
    'username': username,
    'password': password
  }
  return request({
    url: '/oauth/token',
    method: 'post',
    data
  })
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
    params: { token }
  })
}

