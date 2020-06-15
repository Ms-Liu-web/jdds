import request from '@/utils/request'

// 设置基础信息
export function configEdit(data) {
  return request({
    url: '/admin/user/configEdit',
    method: 'POST',
    data
  })
}
// 获取商品列表
export function getGoodsList(data) {
  return request({
    url: '/admin/user/goodsList',
    method: 'post',
    data
  })
}

// 获取自定义商品类型
export function getGoodsCate(data) {
  return request({
    url: '/admin/user/goodsCate',
    method: 'post',
    data
  })
}
export function getGoodsAdd(data) {
  return request({
    url: '/admin/user/goodsAdd',
    method: 'post',
    data
  })
}
// export function configEdit(data) {
//   return request({
//     url: '/admin/user/configEdit',
//     method: 'POST',
//     data
//   })
// }

// export function getSuperior(data) {
//   return request({
//     url: '/agent/superior',
//     method: 'POST',
//     data
//   })
// }
// /*
// 冻结用户
// */
// export function freezeAgent(data) {
//   return request({
//     url: '/agent/freezeagent',
//     method: 'POST',
//     data
//   })
// }
// /*
//  解除冻结
// */
// export function unFreezeAgent(data) {
//   return request({
//     url: '/agent/thawagent',
//     method: 'POST',
//     data
//   })
// }
// /*
//  充值
// */
// export function addMoney(data) {
//   return request({
//     url: '/agent/rechargeforsuperior',
//     method: 'POST',
//     data
//   })
// }
// /*
//   绑定下级
// */
// export function bindSuperior(data) {
//   return request({
//     url: '/agent/bindsuperior',
//     method: 'POST',
//     data
//   })
// }

// /**
//  * 获取首页数据
//  */

// export function agentSellInfo(data) {
//   return request({
//     url: '/agent/agentsellinfo',
//     method: 'POST',
//     data
//   })
// }
// /**
//  * 获取首页数据
//  */
// export function getReportForm(data) {
//   return request({
//     url: '/agent/reportform',
//     method: 'POST',
//     data: { day: '7' }
//   })
// }
// /**
//  * 获取首页公告数据
//  */
// export function getNotice(data) {
//   return request({
//     url: '/agent/notice',
//     method: 'POST'
//   })
// }
// /**
//  * 获取首页数据
//  */
// export function updateSuperior(data) {
//   return request({
//     url: '/agent/updatesuperior',
//     method: 'POST',
//     data
//   })
// }
