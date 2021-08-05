import request from '@/api/request.js';
/**
 * ===========
 * 消息服务接口
 * ===========
 */


/**
 * 获取未读消息数
 */


/**
 * 修改密码
 */
export async function changepassword(params) {
  return await request('/sys/user/updatePassword','put',params)
}

// 退出登录
export async function logouts() {
  return await request('/sys/logout')
}
/**
 * 获取用户点赞、评论、提醒消息列表
 * @param {Object} params 参数 {page,count,type }
 * 类型 top 点赞、comment 评论、remind 提醒、
 */
export async function getMessageListByType(params) {
  return await request('/stpe/scoreCount/queryByPersonId', 'get', params)
}
