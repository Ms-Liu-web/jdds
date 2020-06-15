import request from '@/utils/request'
export function getGoodsList(data) {
  return request({
    url: '/admin/user/goodsList',
    // url: '/auth/login',
    method: 'post',
    data
  })
}
