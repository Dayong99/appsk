import request from '@/api/request.js';
import store from '@/store'
/**
 * ===========
 * 常见公共服务接口
 * ===========
 */

/**
 * 加密需要解析的字符串 -视频、密码
 * @param {String} text 需要加密的字符串
 */
export async function getRsaText(params) {
  let [err, res] = await uni.request({
    // url: `https://www.hanfuhui.com/Home/Rsa?text=${text}`,
    url: store.state.baseUrl+'/sys/mLogin',
    method: 'POST',
	data:params,
    header: {
      'hanfuhui_fromclient': 'PC',
      'hanfuhui_token': uni.getStorageSync('TOKEN') || '',
    }
  })
  return err ? "" : res
}

/**
 * 主页banner与热门话题
 */
export async function getBannerTopicList() {
  return await request('/system/GetDefault')
}

/**
 * APP启动封面图
 */
export async function getStarCover() {
  return await request('/Poster/GetPosterInfoByAppStart?count=3')
}

/**
 * APP启动检查更新 
 * @param {Object} params 参数 {num:65,client:'android' }
 * num 版本号
 */
export async function getAppNewVersion(params) {
  return await request('/system/GetAppVersionForNew', 'get', params)
}

/**
 * 获取又拍云图片上传授权
 * @param {Object} params 参数 {filesize:62381,filetype:'jpg' }
 */
export async function getUpyunAuth(params = {
  filesize: 62381,
  filetype: 'jpg'
}) {
  return await request('/Upload/GetUpyunAuthention', 'get', params)
}

/**
 * 动态信息举报
 * @param {Number} ids 参数 {objecttype:'comment',objectid:8783590,touserid:1375494,reason:'怠惰举报，没事开个玩笑。'}
 * objecttype： album 摄影、trend 趋势动态、topicreply 话题、video 视频
 * objectid： 列表中ID或者ObjectID
 * touserid：举报用户ID
 * reason：举报内容
 */
export async function addReport(params = {
  objecttype: 'comment',
  objectid: 8783590,
  touserid: 1375494,
  reason: '怠惰举报，没事开个玩笑。'
}) {
  return await request('/system/InsertReport', 'post', params)
}

/**
 * 获取省市列表
 * @param {Number} parentid 参数 0 省列表 、 通过省ID的市列表 
 */
export async function getCityList(parentid = 0) {
  return await request('/Base/GetCityList', 'get', {
    parentid
  })
}


/**
 * 获取排行榜列表
 * @param {Object} params 参数 {page,count,type}
 * type album 摄影、hanbi 汉币、popularity 人气、signin 签到、
 */
export async function getRankList(params = {
  page: '1',
  count: '20',
  type: 'album'
}) {
  return await request('/user/GetUserListForRank', 'get', params)
}

/**
 兑换记录
 */
export async function getUserViolationList(params = {
  page: '1',
  count: '20'
}) {
  return await request('/stpe/convert/list', 'get', params)
}
/**
 兑换详情
 */
export async function getUserViolationListid(params) {
  return await request('/stpe/convert/queryById', 'get', params)
}
// 文章列表
export async function articleApp(params) {
  return await request('/sys/mLogin', 'post', params)
}

// 领取
export async function drawGiftsn(params) {
  return await request('/stpe/convert/agreeReceive', 'get', params)
}
// homt主题
export async function subjectCont(params) {
  return await request('/stpe/sysSetting/list', 'get',params)
}

