import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/agent/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/agent/info',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/agent/logout',
    method: 'post'
  })
}

export function captcha() {
  return request({
    url: '/captcha',
    method: 'get'
  })
}

export function setingUpdate(data) {
  return request({
    url: '/agent/seting',
    method: 'post',
    data
  })
}
