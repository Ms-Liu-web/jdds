import request from '@/utils/request'

/*
  获取卡列表
*/
export function getCardList(data) {
  return request({
    url: 'admin/user/goodsAdd',
    method: 'POST',
    data
  })
}
/*
  创建卡
*/
export function createCard(data) {
  return request({
    url: '/agent/createcard',
    method: 'POST',
    data
  })
}

/*
  获取卡类型
 */
export function getCardType(data) {
  return request({
    url: '/agent/cardtype',
    method: 'POST',
    data
  })
}

/*
  冻结卡
*/
export function freezeCard(data) {
  return request({
    url: '/agent/freezecard',
    method: 'POST',
    data
  })
}
/*
  解冻
*/
export function thawCard(data) {
  return request({
    url: '/agent/thawcard',
    method: 'POST',
    data
  })
}
/*
  查看卡详情
*/
export function showCardInfo(data) {
  return request({
    url: '/agent/selectcardbycardnumber',
    method: 'POST',
    data
  })
}
/*
  删除卡
*/
export function deleteCard(data) {
  return request({
    url: '/agent/deletecard',
    method: 'POST',
    data
  })
}
/*
  用户管理
*/
export function getCardUserList(data) {
  return request({
    url: '/agent/carduserlist',
    method: 'POST',
    data
  })
}
